// "use client";

// import Script from "next/script";

// const GA_ID = process.env.NEXT_PUBLIC_GA_ID; // e.g. G-XXXXXXXXXX
// const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID; // e.g. AW-XXXXXXXXX

// export default function GoogleTag() {
//   if (!GA_ID && !ADS_ID) return null;

//   return (
//     <>
//       <Script
//         src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID || ADS_ID}`}
//         strategy="afterInteractive"
//       />
//       <Script id="google-tag-init" strategy="afterInteractive">
//         {`
//           window.dataLayer = window.dataLayer || [];
//           function gtag(){dataLayer.push(arguments);}
//           gtag('js', new Date());
//           ${GA_ID ? `gtag('config', '${GA_ID}');` : ""}
//           ${ADS_ID ? `gtag('config', '${ADS_ID}');` : ""}
//         `}
//       </Script>
//     </>
//   );
// }