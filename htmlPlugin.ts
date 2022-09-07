type HtmlPluginType = (env: { [key: string]: string }) => {
  name: string;
  transformIndexHtml(html: string): string;
};

const htmlPlugin: HtmlPluginType = (env) => ({
  name: 'html-transform',
  transformIndexHtml: (html: string) =>
    html.replace(/%(.*?)%/g, (_, p1) => env[p1]),
});

export default htmlPlugin;
