{ pkgs, lib, config, inputs, ... }:

{
  packages = with pkgs; [
    uv
    nodejs_22
  ];
  languages.python = {
    enable = true;
    venv.enable = true;
  };
  enterShell = ''
    uv pip install -r requirements.txt
  '';
}
