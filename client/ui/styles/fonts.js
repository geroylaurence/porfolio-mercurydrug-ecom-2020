import proxima_nova_alt_black_eot from '../../../assets/fonts/proxima_nova_alt_black-webfont.eot';
import proxima_nova_alt_black_woff2 from '../../../assets/fonts/proxima_nova_alt_black-webfont.woff2';
import proxima_nova_alt_black_woff from '../../../assets/fonts/proxima_nova_alt_black-webfont.woff';
import proxima_nova_alt_black_ttf from '../../../assets/fonts/proxima_nova_alt_black-webfont.ttf';
import proxima_nova_alt_black_svg from '../../../assets/fonts/proxima_nova_alt_black-webfont.svg';

import proxima_nova_alt_bold_eot from '../../../assets/fonts/proxima_nova_alt_bold-webfont.eot';
import proxima_nova_alt_bold_woff2 from '../../../assets/fonts/proxima_nova_alt_bold-webfont.woff2';
import proxima_nova_alt_bold_woff from '../../../assets/fonts/proxima_nova_alt_bold-webfont.woff';
import proxima_nova_alt_bold_ttf from '../../../assets/fonts/proxima_nova_alt_bold-webfont.ttf';
import proxima_nova_alt_bold_svg from '../../../assets/fonts/proxima_nova_alt_bold-webfont.svg';

import proxima_nova_alt_regular_italic_eot from '../../../assets/fonts/proxima_nova_alt_regular_italic-webfont.eot';
import proxima_nova_alt_regular_italic_woff2 from '../../../assets/fonts/proxima_nova_alt_regular_italic-webfont.woff2';
import proxima_nova_alt_regular_italic_woff from '../../../assets/fonts/proxima_nova_alt_regular_italic-webfont.woff';
import proxima_nova_alt_regular_italic_ttf from '../../../assets/fonts/proxima_nova_alt_regular_italic-webfont.ttf';
import proxima_nova_alt_regular_italic_svg from '../../../assets/fonts/proxima_nova_alt_regular_italic-webfont.svg';

import proxima_nova_alt_rgregular_eot from '../../../assets/fonts/proxima_nova_alt_regular-webfont.eot';
import proxima_nova_alt_rgregular_woff2 from '../../../assets/fonts/proxima_nova_alt_regular-webfont.woff2';
import proxima_nova_alt_rgregular_woff from '../../../assets/fonts/proxima_nova_alt_regular-webfont.woff';
import proxima_nova_alt_rgregular_ttf from '../../../assets/fonts/proxima_nova_alt_regular-webfont.ttf';
import proxima_nova_alt_rgregular_svg from '../../../assets/fonts/proxima_nova_alt_regular-webfont.svg';

const fonts = `
  @font-face {
    font-family: 'proxima_nova_altblack';
    src: url(${proxima_nova_alt_black_eot});
    src: url('${proxima_nova_alt_black_eot}?#iefix') format('embedded-opentype'),
         url(${proxima_nova_alt_black_woff2}) format('woff2'),
         url(${proxima_nova_alt_black_woff}) format('woff'),
         url(${proxima_nova_alt_black_ttf}) format('truetype'),
         url('${proxima_nova_alt_black_svg}#proxima_nova_altblack') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'proxima_nova_alt_rgbold';
    src: url(${proxima_nova_alt_bold_eot});
    src: url('${proxima_nova_alt_bold_eot}?#iefix') format('embedded-opentype'),
         url(${proxima_nova_alt_bold_woff2}) format('woff2'),
         url(${proxima_nova_alt_bold_woff}) format('woff'),
         url(${proxima_nova_alt_bold_ttf}) format('truetype'),
         url(${proxima_nova_alt_bold_svg}) format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'proxima_nova_altRgIt';
    src: url(${proxima_nova_alt_regular_italic_eot});
    src: url('${proxima_nova_alt_regular_italic_eot}?#iefix') format('embedded-opentype'),
         url(${proxima_nova_alt_regular_italic_woff2}) format('woff2'),
         url(${proxima_nova_alt_regular_italic_woff}) format('woff'),
         url(${proxima_nova_alt_regular_italic_ttf}) format('truetype'),
         url('${proxima_nova_alt_regular_italic_svg}#proxima_nova_altRgIt') format('svg');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'proxima_nova_alt_rgregular';
    src: url(${proxima_nova_alt_rgregular_eot});
    src: url('${proxima_nova_alt_rgregular_eot}?#iefix') format('embedded-opentype'),
         url(${proxima_nova_alt_rgregular_woff2}) format('woff2'),
         url(${proxima_nova_alt_rgregular_woff}) format('woff'),
         url(${proxima_nova_alt_rgregular_ttf}) format('truetype'),
         url(${proxima_nova_alt_rgregular_svg}) format('svg');
    font-weight: normal;
    font-style: normal;
  }
`;

export default fonts;