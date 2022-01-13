import { PluginOption } from "vite";

type AssetsPluginOptions = {
  replaces: string[];
};

const getOrigin = (server): string => {
  const host = server.host || "localhost";
  const port = server.port;
  const protocol = server.https ? "https" : "http";

  return `${protocol}://${host}:${port}`;
};

const replace = (code: string, replaces: string[], server): string => {
  const origin = getOrigin(server);

  replaces.forEach((replace: string) => {
    const regex = new RegExp(`${replace}`, "g");
    code = code.replace(regex, `${origin}${replace}`);
  });

  return code;
};

export default function assets(options: AssetsPluginOptions): PluginOption {
  let server;
  return {
    name: "assets",
    apply: "serve",
    enforce: "post",
    configureServer(vite) {
      server = vite.config.server;
    },
    transform: (code: string) => ({
      code: replace(code, options.replaces, server),
      map: null,
    }),
    transformIndexHtml: (html: string) =>
      replace(html, options.replaces, server),
  };
}
