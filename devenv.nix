{ pkgs, lib, config, inputs, ... }:

{
  packages = [
    pkgs.uv
  ];
  languages.python = {
    enable = true;
    venv.enable = true;
  };
  enterShell = ''
    uv pip install -r requirements.txt
  '';
}
