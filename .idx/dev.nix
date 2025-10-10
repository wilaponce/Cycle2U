{pkgs}: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.dotnetCorePackages.sdk_8_0
    pkgs.docker
    pkgs.docker-compose
    pkgs.sudo
  ];
  idx.extensions = [

  ];
  idx.previews = {
    previews = {
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "127.0.0.1"
        ];
        manager = "web";
      };
    };
  };
}