Add-Type -AssemblyName System.Drawing

function Export-WhiteBackgroundProduct {
  param(
    [Parameter(Mandatory = $true)][string]$InputPath,
    [Parameter(Mandatory = $true)][string]$OutputPath,
    [int]$CropX = 0,
    [int]$CropY = 0,
    [int]$CropWidth = 0,
    [int]$CropHeight = 0
  )

  $source = [System.Drawing.Bitmap]::FromFile($InputPath)
  try {
    if ($CropWidth -le 0) { $CropWidth = $source.Width - $CropX }
    if ($CropHeight -le 0) { $CropHeight = $source.Height - $CropY }

    $crop = New-Object System.Drawing.Bitmap($CropWidth, $CropHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($crop)
    try {
      $graphics.DrawImage(
        $source,
        (New-Object System.Drawing.Rectangle(0, 0, $CropWidth, $CropHeight)),
        (New-Object System.Drawing.Rectangle($CropX, $CropY, $CropWidth, $CropHeight)),
        [System.Drawing.GraphicsUnit]::Pixel
      )
    } finally {
      $graphics.Dispose()
    }

    $mask = New-Object 'bool[,]' $CropWidth, $CropHeight
    for ($y = 0; $y -lt $CropHeight; $y++) {
      for ($x = 0; $x -lt $CropWidth; $x++) {
        $color = $crop.GetPixel($x, $y)
        $distance = [Math]::Max(255 - $color.R, [Math]::Max(255 - $color.G, 255 - $color.B))
        $alpha = if ($distance -le 4) { 0 } elseif ($distance -ge 20) { 255 } else { [int](($distance - 4) * 255 / 16) }
        $mask[$x, $y] = $alpha -gt 48
        $crop.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $color.R, $color.G, $color.B))
      }
    }

    $visited = New-Object 'bool[,]' $CropWidth, $CropHeight
    $largest = New-Object System.Collections.Generic.List[System.Drawing.Point]
    $directions = @(
      [System.Drawing.Point]::new(1, 0),
      [System.Drawing.Point]::new(-1, 0),
      [System.Drawing.Point]::new(0, 1),
      [System.Drawing.Point]::new(0, -1)
    )

    for ($startY = 0; $startY -lt $CropHeight; $startY++) {
      for ($startX = 0; $startX -lt $CropWidth; $startX++) {
        if (-not $mask[$startX, $startY] -or $visited[$startX, $startY]) { continue }

        $component = New-Object System.Collections.Generic.List[System.Drawing.Point]
        $queue = New-Object System.Collections.Generic.Queue[System.Drawing.Point]
        $queue.Enqueue([System.Drawing.Point]::new($startX, $startY))
        $visited[$startX, $startY] = $true

        while ($queue.Count -gt 0) {
          $point = $queue.Dequeue()
          $component.Add($point)
          foreach ($direction in $directions) {
            $nextX = $point.X + $direction.X
            $nextY = $point.Y + $direction.Y
            if ($nextX -lt 0 -or $nextY -lt 0 -or $nextX -ge $CropWidth -or $nextY -ge $CropHeight) { continue }
            if ($mask[$nextX, $nextY] -and -not $visited[$nextX, $nextY]) {
              $visited[$nextX, $nextY] = $true
              $queue.Enqueue([System.Drawing.Point]::new($nextX, $nextY))
            }
          }
        }

        if ($component.Count -gt $largest.Count) { $largest = $component }
      }
    }

    $keep = New-Object 'bool[,]' $CropWidth, $CropHeight
    foreach ($point in $largest) { $keep[$point.X, $point.Y] = $true }

    # Preserve antialiased edge pixels touching the largest component.
    for ($pass = 0; $pass -lt 3; $pass++) {
      $expanded = $keep.Clone()
      for ($y = 1; $y -lt $CropHeight - 1; $y++) {
        for ($x = 1; $x -lt $CropWidth - 1; $x++) {
          if ($keep[$x, $y]) { continue }
          if ($crop.GetPixel($x, $y).A -eq 0) { continue }
          if ($keep[($x - 1), $y] -or $keep[($x + 1), $y] -or $keep[$x, ($y - 1)] -or $keep[$x, ($y + 1)]) {
            $expanded[$x, $y] = $true
          }
        }
      }
      $keep = $expanded
    }

    $minX = $CropWidth
    $minY = $CropHeight
    $maxX = -1
    $maxY = -1
    for ($y = 0; $y -lt $CropHeight; $y++) {
      for ($x = 0; $x -lt $CropWidth; $x++) {
        if (-not $keep[$x, $y]) {
          $color = $crop.GetPixel($x, $y)
          $crop.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, $color.R, $color.G, $color.B))
          continue
        }
        if ($x -lt $minX) { $minX = $x }
        if ($x -gt $maxX) { $maxX = $x }
        if ($y -lt $minY) { $minY = $y }
        if ($y -gt $maxY) { $maxY = $y }
      }
    }

    if ($maxX -lt $minX -or $maxY -lt $minY) { throw "No product pixels found in $InputPath" }

    $padding = 18
    $minX = [Math]::Max(0, $minX - $padding)
    $minY = [Math]::Max(0, $minY - $padding)
    $maxX = [Math]::Min($CropWidth - 1, $maxX + $padding)
    $maxY = [Math]::Min($CropHeight - 1, $maxY + $padding)
    $finalWidth = $maxX - $minX + 1
    $finalHeight = $maxY - $minY + 1

    $final = New-Object System.Drawing.Bitmap($finalWidth, $finalHeight, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $finalGraphics = [System.Drawing.Graphics]::FromImage($final)
    try {
      $finalGraphics.DrawImage(
        $crop,
        (New-Object System.Drawing.Rectangle(0, 0, $finalWidth, $finalHeight)),
        (New-Object System.Drawing.Rectangle($minX, $minY, $finalWidth, $finalHeight)),
        [System.Drawing.GraphicsUnit]::Pixel
      )
      $final.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $finalGraphics.Dispose()
      $final.Dispose()
    }
  } finally {
    if ($crop) { $crop.Dispose() }
    $source.Dispose()
  }
}

$outputDir = Join-Path $PSScriptRoot "..\public\products"
$inputDir = Join-Path $PSScriptRoot "..\tmp\hero-input"

Export-WhiteBackgroundProduct `
  -InputPath (Join-Path $inputDir "pet-glove-black-back-source.jpg") `
  -OutputPath (Join-Path $outputDir "pet-glove-black-back.png") `
  -CropX 170 -CropY 80 -CropWidth 650 -CropHeight 820

Export-WhiteBackgroundProduct `
  -InputPath (Join-Path $inputDir "pet-glove-yellow-front-source.jpg") `
  -OutputPath (Join-Path $outputDir "pet-glove-yellow-front.png") `
  -CropX 130 -CropY 80 -CropWidth 630 -CropHeight 620

Export-WhiteBackgroundProduct `
  -InputPath (Join-Path $inputDir "cat-paw-glove-grey-source.jpg") `
  -OutputPath (Join-Path $outputDir "cat-paw-glove-grey.png") `
  -CropX 100 -CropY 70 -CropWidth 590 -CropHeight 700

Export-WhiteBackgroundProduct `
  -InputPath (Join-Path $inputDir "pet-glove-yellow-side-source.jpg") `
  -OutputPath (Join-Path $outputDir "pet-glove-yellow-side.png") `
  -CropX 190 -CropY 100 -CropWidth 650 -CropHeight 820

Export-WhiteBackgroundProduct `
  -InputPath (Join-Path $inputDir "pet-bath-brush-source.jpg") `
  -OutputPath (Join-Path $outputDir "pet-bath-brush-green.png") `
  -CropX 395 -CropY 210 -CropWidth 565 -CropHeight 570
