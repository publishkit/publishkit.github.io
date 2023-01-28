return class Theme extends BaseTheme {
  constructor(id, options) {
    super(id, options);
    this.options = this.utils.o.merge(
      {
        animate: 35,
        highlight: "base16/green-screen",
        font: "monospace",
        headings: {
          font: "Gosper",
        },
      },
      this.options
    );
  }

  render = async () => {
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

    // add canvas to body
    if (options.animate)
      this.ui.addElement("body", "canvas", `<canvas></canvas>`);
  };

  bind = async () => {
    const { options } = this;

    if (options.animate) this.matrix();
  };

  style = async () => {
    const { options } = this;
    const css = `
        [id="body.theme.canvas"] canvas {
            position: absolute; 
            z-index: -1;
        }
        
        :root,
        :root[data-theme="dark"],
        :root:not([data-theme="dark"]),
        [data-theme="dark"],
        [data-theme="light"] {
            --font-family: ${options.font}, sans-serif;
            --headings-font-family: ${options.headings?.font}, sans-serif;

            --primary: #2fff00;
            --secondary: #6c757d;
            --success: #26c57b;
            --info: #0dcaf0;
            --warning: #ffab00;
            --danger: #df515f;
            --white: #fff;
            --black: #000;

            --primary-hover: #2fff00;
            --primary-inverse: var(--black);

            --primary-contrast: #000;
            --secondary-contrast: #fff;
            --success-contrast: #fff;
            --info-contrast: #fff;
            --warning-contrast: #fff;
            --danger-contrast: #fff;
            --white-contrast: #000;
            --black-contrast: #fff;

            --font-size: 20px;
            --background-color: #000;
            --color: #2ae600;
            --contrast: var(--color);
            --contrast-inverse: var(--black);
            --contrast-hover: #fff;
            --code-color: var(--black);
            --code-background-color: var(--color);
            --border-radius: 0;

            --h1-color: var(--color);
            --h2-color: var(--color);
            --h3-color: var(--color);
            --h4-color: var(--color);
            --h5-color: var(--color);
            --h6-color: var(--color);

            --muted-border-color: #103105;
            
            --form-element-disabled-background-color: red;
            --input-height: 2.2rem;
            --input-padding-x: 0.4rem;
            --input-padding: 0 var(--input-padding-x);
            --input-fs: 0.9rem;
            --table-row-stripped-background-color: #2ae60003;
            
            --blockquote-border-color: #011801;
            --mark-background-color: var(--primary);
            --mark-color: var(--primary-contrast);

            --form-element-background-color: var(--black);
            --form-element-border-color: var(--muted-border-color);
            --form-element-focus-color: #032302;
            --form-element-disabled-background-color: #838080;
            --form-element-placeholder-color: var(--color);

            --card-background-color: #020601e8;
            --card-box-shadow: 0px 0px 6px #2ae60026;
            --card-sectionning-background-color: #06781121;

            --dropdown-background-color: var(--form-element-background-color);
            --dropdown-border-color: var(--form-element-border-color);
            --dropdown-hover-background-color: var(--card-background-color);

            --modal-overlay-background-color: rgb(0 0 0 / 65%);

            --icon-chevron: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232FFF00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
            --icon-date: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232FFF00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='2' ry='2'%3E%3C/rect%3E%3Cline x1='16' y1='2' x2='16' y2='6'%3E%3C/line%3E%3Cline x1='8' y1='2' x2='8' y2='6'%3E%3C/line%3E%3Cline x1='3' y1='10' x2='21' y2='10'%3E%3C/line%3E%3C/svg%3E");
            --icon-search: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232FFF00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E");
            --icon-time: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232FFF00' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='10'%3E%3C/circle%3E%3Cpolyline points='12 6 12 12 16 14'%3E%3C/polyline%3E%3C/svg%3E");

            --callout-bg: var(--blockquote-border-color);
            --callout-color: var(--color);
            --callout-border-radius: var(--border-radius);
            --callout-icon-width: 20px;
            --callout-bg-singletone: var(--code-background-color);
            --callout-color-singletone: var(--callout-color);

            --code-color: #73828c;
            --code-background-color: #2ae6000a;


        }

        [role="document"] {
            background: var(--card-background-color);
            a {
                text-decoration: underline;
            }
        }

        [id="right.toc.main"] ul > .is-visible {
            background: var(--card-sectionning-background-color);
        }

        details[role=list] summary+ul {
            --card-box-shadow: none;
        }

        .right-bar {
            background: var(--card-background-color);
        }
    `;

    return css;
  };

  matrix = () => {
    const { ui, utils, options } = this;

    var c = ui.getElement("body", "canvas").el.find("canvas").get(0);
    var ctx = c.getContext("2d");

    //making the canvas full screen
    c.height = utils.w.pageHeight();
    c.width = window.innerWidth;

    //chinese characters - taken from the unicode charset
    var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%";
    //converting the string into an array of single characters
    matrix = matrix.split("");

    var fontsize = options.fontsize || 10;
    var columns = c.width / fontsize; //number of columns for the rain
    //an array of drops - one per column
    var drops = [];
    //x below is the x coordinate
    //1 = y co-ordinate of the drop(same for every drop initially)
    for (var x = 0; x < columns; x++) drops[x] = 1;

    //drawing the characters
    function draw() {
      //Black BG for the canvas
      //translucent BG to show trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.03)";
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "#0F0"; //green text
      ctx.font = fontsize + "px arial";
      //looping over drops
      for (var i = 0; i < drops.length; i++) {
        //a random chinese character to print
        var text = matrix[Math.floor(Math.random() * matrix.length)];
        //x = i*fontsize, y = value of drops[i]*fontsize
        ctx.fillText(text, i * fontsize, drops[i] * fontsize);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if (drops[i] * fontsize > c.height && Math.random() > 0.975)
          drops[i] = 0;

        //incrementing Y coordinate
        drops[i]++;
      }
    }

    setInterval(draw, options.animate);
  };
};
