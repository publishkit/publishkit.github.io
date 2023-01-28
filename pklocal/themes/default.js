return class Theme extends BaseTheme {
  constructor(id, options) {
    super(id, options);
    this.options = this.utils.o.merge(
      {
        highlight: "base16/codeschool",
        font: "Marcher",
        headings: {
          font: "Marcher",
        },
      },
      this.options
    );
  }

  bind = async () => {
    const { options, utils } = this;

    const font = options.font?.trim().replaceAll(" ", "-").toLowerCase();
    const headingsFont = options.headings?.font
      ?.trim()
      .replaceAll(" ", "-")
      .toLowerCase();

    if (font) utils.dom.addStylesheet(`https://fonts.cdnfonts.com/css/${font}`);

    if (headingsFont && headingsFont != font)
      utils.dom.addStylesheet(`https://fonts.cdnfonts.com/css/${headingsFont}`);

    if (options.highlight) {
      await utils.dom.addScript(
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/highlight.min.js"
      );
      await utils.dom.addStylesheet(
        `https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.7.0/build/styles/${options.highlight}.min.css`
      );
      (function wait() {
        if (!window.hljs) {
          setTimeout(wait, 100);
        } else {
          window.hljs.configure({
            ignoreUnescapedHTML: true,
          });

          document.querySelectorAll("pre code").forEach((el) => {
            window.hljs.highlightElement(el);
          });
        }
      })();
    }
  };

  style = async () => {
    const { options } = this;
    const css = `
          :root {
              --font-family: ${options.font}, sans-serif;
              --headings-font-family: ${options.headings?.font}, sans-serif;
          }`;

    return css;
  };
};
