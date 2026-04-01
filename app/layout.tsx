// "use client";

// import { Provider } from "react-redux";
// import { store } from "../store/store";
// import "./globals.css";

// export default function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className="bg-[#0B0F19] text-white">
//         <Provider store={store}>

//           {/* 🔥 MAIN APP CONTAINER */}
//           <div className="min-h-screen flex">

//             {/* OPTIONAL SIDEBAR SPACE */}
//             <div className="flex-1 flex flex-col">

//               {/* 🔥 CENTERED CONTENT WRAPPER */}
//               <main className="w-full max-w-screen-2xl mx-auto px-6 md:px-10 py-6">
//                 {children}
//               </main>

//             </div>
//           </div>

//         </Provider>
//       </body>
//     </html>
//   );
// }






"use client";

import { Provider } from "react-redux";
import { store } from "../store/store";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ❗ IMPORTANT: suppress hydration warning */}
      <body suppressHydrationWarning className="bg-[#0B0F19] text-white">
        <Provider store={store}>
          
          {/* 🔥 MAIN APP CONTAINER */}
          <div className="min-h-screen flex">

            {/* OPTIONAL SIDEBAR SPACE */}
            <div className="flex-1 flex flex-col">

              {/* 🔥 CENTERED CONTENT WRAPPER */}
              <main className="w-full max-w-screen-2xl mx-auto px-6 md:px-10 py-6">
                {children}
              </main>

            </div>
          </div>

        </Provider>
      </body>
    </html>
  );
}