$projectRoot = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$distDir = Join-Path $projectRoot 'dist'
$docsDir = Join-Path $projectRoot 'docs'
$distAssetsDir = Join-Path $distDir 'assets'
$docsAssetsDir = Join-Path $docsDir 'assets'
$distIndex = Join-Path $distDir 'index.html'
$docsIndex = Join-Path $docsDir 'index.html'
$noJekyll = Join-Path $docsDir '.nojekyll'

if (-not (Test-Path $distIndex)) {
  throw "dist/index.html not found. Run npm run build first."
}

New-Item -ItemType Directory -Force $docsDir | Out-Null

Remove-Item -LiteralPath $docsAssetsDir -Recurse -Force -ErrorAction SilentlyContinue
Copy-Item -LiteralPath $distIndex -Destination $docsIndex -Force
Copy-Item -LiteralPath $distAssetsDir -Destination $docsAssetsDir -Recurse -Force

if (-not (Test-Path $noJekyll)) {
  New-Item -ItemType File -Path $noJekyll | Out-Null
}

Write-Host "Synced dist to docs for GitHub Pages."
