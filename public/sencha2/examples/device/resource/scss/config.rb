# Get the directory that this configuration file exists in
dir = File.dirname(__FILE__)

# Load the sencha-touch framework automatically.
load File.join(dir, '..', '..', '..', '..', '..', 'touch', 'resources', 'themes')

# Compass configurations
sass_path    = File.join(dir, "..", "scss")
css_path     = File.join(dir, "..", "css")
environment  = :production
output_style = :compressed
