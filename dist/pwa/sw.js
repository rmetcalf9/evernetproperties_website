if(!self.define){let e,s={};const a=(a,c)=>(a=new URL(a+".js",c).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(c,i)=>{const b=e||("document"in self?document.currentScript.src:"")||location.href;if(s[b])return;let r={};const f=e=>a(e,b),d={module:{uri:b},exports:r,require:f};s[b]=Promise.all(c.map((e=>d[e]||f(e)))).then((e=>(i(...e),r)))}}define(["./workbox-37fde244"],(function(e){"use strict";e.setCacheNameDetails({prefix:"evernetproperties"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/AboutPage.ac2d1346.js",revision:"20f7812914d77eff4e3aad95e2d31851"},{url:"assets/axios.22f022e5.js",revision:"11c5d61daa2ae9124e096b0055888f2b"},{url:"assets/axios.6e1fcf85.js",revision:"313efc7ce18a569cc59c8627eb565fe3"},{url:"assets/backend_connection.61c1633f.js",revision:"e115496fddd2f18f3d0277181d6115ca"},{url:"assets/brand-colors.44bc94ad.js",revision:"48d81a69d0ce411d4e788a0fb9361839"},{url:"assets/BrrCalc.7121d082.css",revision:"2943e163dc535cc82c4739cc3f12aeea"},{url:"assets/BrrCalc.9b06008d.js",revision:"d2b7b1a3ccbd6a4408b946f91a812bcd"},{url:"assets/bus.cce3bc63.js",revision:"d9b94661a10a12d8c86b3416542ea699"},{url:"assets/CanSavePagesLayout.24032736.css",revision:"9d1805ad164bb99cb24754c7e270600a"},{url:"assets/CanSavePagesLayout.33baf397.js",revision:"5211b82b4f47794175d723f6fb06a43d"},{url:"assets/ClosePopup.304c1a80.js",revision:"451da3fd5336188bec8f7b6bfe140661"},{url:"assets/CommonBRRToolLink.0f56660f.js",revision:"731192ddd5bd8ef0c2ad5d81507a9ac5"},{url:"assets/ContactPage.3a7f90bf.css",revision:"f5f96d09ec1db81a972239a74b4be8ab"},{url:"assets/ContactPage.b199fabc.js",revision:"972b9c552927106484c1574951e9a088"},{url:"assets/CrmInvestorSubForm.16a6efe7.css",revision:"2c911db85e211ce7b9d933d3413d06cd"},{url:"assets/CrmInvestorSubForm.429d95ac.js",revision:"b0e1a57baa7c3452e99d835be91834e5"},{url:"assets/DebugInfo.5b48f74b.js",revision:"c8650288b3b81082582c9202add50570"},{url:"assets/DebugInfo.9ff57b95.css",revision:"aa6394a02347b0a92fc058d413379a33"},{url:"assets/ErrorNotFound.748ebb59.js",revision:"29881410a252a34ad13dac2004276205"},{url:"assets/Faq.9b4ee9a7.js",revision:"3972623b6395d35c0d832903cf1a9cbf"},{url:"assets/Faq.f8d17218.css",revision:"58e5219cc34e28564f75588b140f1420"},{url:"assets/FeatureTable.ba87b95e.js",revision:"a893dd2c6aa48f81a32f184b3f047fda"},{url:"assets/FeatureTable.eeca5ee5.css",revision:"a6143cc38697c561f323d241def69e80"},{url:"assets/FlipCalc.33867820.css",revision:"a2c0b5942e7c882c53cf9e08995c1d5d"},{url:"assets/FlipCalc.849f0ed2.js",revision:"c05615e2b4dc95e8167be2ee90ca9cd5"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa.fd84f88b.woff",revision:"3e1afe59fa075c9e04c436606b77f640"},{url:"assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ.4a4dbc62.woff2",revision:"a4160421d2605545f69a4cd6cd642902"},{url:"assets/googleapi.6c3f0919.js",revision:"d61cfe314a0a8c16d1999a2c507b0cae"},{url:"assets/HeadToolbars.7418d93b.js",revision:"6e21dc0ca2c60344d43bd967a6d6cc13"},{url:"assets/HeadToolbars.aa5e3a80.css",revision:"7688c7bde141488cd760ad67a56077ea"},{url:"assets/HomePage.cd6f57ed.js",revision:"26582c75455845e90bd7b5b680d223ca"},{url:"assets/HomePage.e5e0124f.css",revision:"d813f809e3de29d923b31a0f464e9617"},{url:"assets/index.50ae419a.css",revision:"548b56cd1f55af9399d4a0df14e63c39"},{url:"assets/index.cd1cbd67.js",revision:"aaa50b8cdd16c6ee9dbe686fffb13ee0"},{url:"assets/KFOkCnqEu92Fr1MmgVxIIzQ.34e9582c.woff",revision:"4aa2e69855e3b83110a251c47fdd05fc"},{url:"assets/KFOlCnqEu92Fr1MmEU9fBBc-.9ce7f3ac.woff",revision:"40bcb2b8cc5ed94c4c21d06128e0e532"},{url:"assets/KFOlCnqEu92Fr1MmSU5fBBc-.bf14c7d7.woff",revision:"ea60988be8d6faebb4bc2a55b1f76e22"},{url:"assets/KFOlCnqEu92Fr1MmWUlfBBc-.e0fd57c0.woff",revision:"0774a8b7ca338dc1aba5a0ec8f2b9454"},{url:"assets/KFOlCnqEu92Fr1MmYUtfBBc-.f6537e32.woff",revision:"bcb7c7e2499a055f0e2f93203bdb282b"},{url:"assets/KFOmCnqEu92Fr1Mu4mxM.f2abf7fb.woff",revision:"d3907d0ccd03b1134c24d3bcaf05b698"},{url:"assets/LoginButton.8bd22a05.js",revision:"049dc1f63661a1db9efad1528100819b"},{url:"assets/main_logo.bf821892.svg",revision:"e5e951909231db6b13f1da27c07c104d"},{url:"assets/MainLayout.121d2ae6.js",revision:"b244f93982b9ba261f695c68d981e0b2"},{url:"assets/MainLayout.217e0044.css",revision:"a215d23f945ece6fa2e199f6607427b1"},{url:"assets/notify-defaults.2f7f62d1.js",revision:"bd480b100f6fb68ea1df4a77428776fb"},{url:"assets/patch_icon.880b248a.png",revision:"37840727daa723edbe177572658a2446"},{url:"assets/Patch.80b3d996.css",revision:"521aafc2e9a2ab8f0574f5093d414192"},{url:"assets/Patch.8696b69c.js",revision:"691100265f022fa9d5a9df639625dfd2"},{url:"assets/Patches.0b6b3e69.js",revision:"307423bd9311537b9223f7b887ab76ec"},{url:"assets/Patches.fa872a10.css",revision:"db5b4456fb6d0fcd4c49fc8ad28de745"},{url:"assets/PIMS Logo White.099cb929.png",revision:"efcca3d2252afc9c7925c4ecef3078f3"},{url:"assets/PIMS Logo White.8f39b7e0.js",revision:"f8966bbb51b9b26bfb81c9b8c38a282a"},{url:"assets/position-engine.20860cbd.js",revision:"9693db7e84650b0b7e639cb696b3bab1"},{url:"assets/Postsubscribe.41aa9ff9.js",revision:"1dee9910dacaaa34d5492c8f3731b44f"},{url:"assets/PrivacyPolicy.1c5dd311.js",revision:"695a92f2e510a9592ca0475bda25bdf5"},{url:"assets/PrivacyPolicy.5fe305f0.css",revision:"45668a07b950b9b695cc4271706a6fb7"},{url:"assets/profile-pic.6e45a5f1.png",revision:"82600f7735ed28cd90b5b9d6a27f52e2"},{url:"assets/profile-pic.7c750275.js",revision:"5860a66c6a224c7664ba90bbf70d9da5"},{url:"assets/Profile.6cb7902b.css",revision:"f9925b183f40c694aaeb5f0ebf87763a"},{url:"assets/Profile.7fddcfea.js",revision:"40f9691a483ffbe722e4a9c053fdba1a"},{url:"assets/QExpansionItem.39b4bb0a.js",revision:"dab7f4b1f370ac387ef3e2102518f9b4"},{url:"assets/QItemLabel.a912ebeb.js",revision:"4289716940198383fa36f565266ad00e"},{url:"assets/QPage.99a11362.js",revision:"875f3bb484efa2b4f95fb6298a9e7db3"},{url:"assets/QResizeObserver.16b74c94.js",revision:"5e3ccd2914b29a253799e329be84b4b7"},{url:"assets/QTable.abbe74ac.js",revision:"f414195c6c40fb47673706e471c4ee8b"},{url:"assets/QToolbar.be09b02a.js",revision:"c59b434410664ba2ad07c6a5132523ee"},{url:"assets/RefurbCalcLayout.1d4fbe72.css",revision:"a9cb9c8e6c3b4f5906607995844e75af"},{url:"assets/RefurbCalcLayout.ec12627e.js",revision:"ae0343bee972d0dca1aae54aa6ad58cd"},{url:"assets/RefurbishmentCalc.9466aa72.css",revision:"929c720ac2ffdd8205f0ffd1dbe1d95f"},{url:"assets/RefurbishmentCalc.96fbb2da.js",revision:"61d25cd57176e798082a384bedf428a7"},{url:"assets/SimpleRoiCalc.4b192472.css",revision:"bc2ca6530f8033cb621a322b47160772"},{url:"assets/SimpleRoiCalc.aa895752.js",revision:"0637ab739b4ebf772a4bf95e5d32dc64"},{url:"assets/tool_brr_calc.71c4dc49.png",revision:"6589852666a731c61b7c4d40ec149009"},{url:"assets/tool_flip_calc.30196ab9.png",revision:"5c38728aa4416a02fdcbdada084a0485"},{url:"assets/tool_simpleroi_calc.19fe75f0.png",revision:"3e82675e4e90283d6021564a23411002"},{url:"assets/Tools.0f2fa4db.css",revision:"b2b8b5bf82f9d989c80980404d9b45e6"},{url:"assets/Tools.78d9c85a.js",revision:"9816c5af0b46afd6f120d9581fa1e226"},{url:"assets/utils.5f33790e.js",revision:"3c6cca55482610d932223d7e45958c91"},{url:"assets/utils.7b533ce3.js",revision:"c109cfcb8051c36ec44cc710df89283a"},{url:"assets/VerifyPims.1d0176f4.js",revision:"21ecda19c01844d4280bafbc9db5cec3"},{url:"assets/VerifyPims.d9a77472.css",revision:"4dac28c023a0b9cecc01257f29452a30"},{url:"assets/Workflow_main.67bc4298.js",revision:"2d3dab686237fc197eff5e2e036fee0f"},{url:"assets/zoom.2619b28f.js",revision:"558c666d266517a6ac813758b852a9cd"},{url:"favicon.ico",revision:"4a9033862115d480d7124dad5036345b"},{url:"icons/apple-icon-120x120.png",revision:"c6f3c720c031372170847cc75d382c84"},{url:"icons/apple-icon-152x152.png",revision:"88feca885a18264a294fe274ada77969"},{url:"icons/apple-icon-167x167.png",revision:"b767da7a1c3f1eb4ff4b5b0854469eb9"},{url:"icons/apple-icon-180x180.png",revision:"876a2f6cb460d1c21418e069c02c2b2a"},{url:"icons/apple-launch-1080x2340.png",revision:"30c859c8567878dc33eb0c2d52286083"},{url:"icons/apple-launch-1125x2436.png",revision:"9011c78723182ef3c4d364ea110c665d"},{url:"icons/apple-launch-1170x2532.png",revision:"56f3b85e4efc7e0ca1f7e20908429abe"},{url:"icons/apple-launch-1179x2556.png",revision:"0f2f9d57ee8d6ebece2a0dc098d63ee1"},{url:"icons/apple-launch-1242x2208.png",revision:"c58770f5c69a3d137e364f4ebe459590"},{url:"icons/apple-launch-1242x2688.png",revision:"994c7a89c7b2eb2fe4721e8ac0a34fa7"},{url:"icons/apple-launch-1284x2778.png",revision:"8a8b03ed4119fb96e327bdc91f164205"},{url:"icons/apple-launch-1290x2796.png",revision:"b467fa8820d8df2297f1decce30711ce"},{url:"icons/apple-launch-1536x2048.png",revision:"8d23ad587b509e7713927d0b4f94a874"},{url:"icons/apple-launch-1620x2160.png",revision:"40b0219450d0c439e20b1af2950bed33"},{url:"icons/apple-launch-1668x2224.png",revision:"111151793ad8d836ee60e25a4e7af204"},{url:"icons/apple-launch-1668x2388.png",revision:"efe09dbdfdbc78872522bf7c7039020c"},{url:"icons/apple-launch-2048x2732.png",revision:"f1ac6b3063da0d6347b3e5c87a79d35c"},{url:"icons/apple-launch-750x1334.png",revision:"7030eae3bb3734fb5e8fe84fbb8fa2cc"},{url:"icons/apple-launch-828x1792.png",revision:"ed881f3599b90c4328282c70b079a3c3"},{url:"icons/favicon-128x128.png",revision:"f49864ac11e032a5f8e7242836241a61"},{url:"icons/favicon-16x16.png",revision:"39ab4b30ed6e5a2599408bfb2e048cb2"},{url:"icons/favicon-32x32.png",revision:"cb4197f64fcf360733ca9423c0cd75d9"},{url:"icons/favicon-96x96.png",revision:"cdfaa0aaf3d8dbac6b93e8b2f5b82ceb"},{url:"icons/icon-128x128.png",revision:"f49864ac11e032a5f8e7242836241a61"},{url:"icons/icon-192x192.png",revision:"99cc723c7551d000261ff83a81595cdc"},{url:"icons/icon-256x256.png",revision:"0129c42340276cb3c9b8ed9af91a0a32"},{url:"icons/icon-384x384.png",revision:"bcf024f68fd3d1b112cc87162dc22946"},{url:"icons/icon-512x512.png",revision:"d1d2c3e276f050108e2e36ae49cda128"},{url:"icons/ms-icon-144x144.png",revision:"85d014028cdebe62d31e8eace623437d"},{url:"icons/safari-pinned-tab.svg",revision:"323000d9b24ae37618dd3d0aa0b5273e"},{url:"index.html",revision:"67c977aa34824bfd81491ad77c29ad65"},{url:"main_logo_og_image.png",revision:"c21713e355d959329373d6ee051e9ffe"},{url:"manifest.json",revision:"c073376fdaf5c3d0c1b9bf530633bc7f"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"),{denylist:[/sw\.js$/,/workbox-(.)*\.js$/]}))}));
