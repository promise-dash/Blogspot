import "@styles/globals.css";
import Provider from "@components/Provider";

export const metadata = {
    title: "Blogspot",
    description: "Dicover and Share Blogs"
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <main>{children}</main>
        </Provider>
      </body>
    </html>
  )
}

export default RootLayout