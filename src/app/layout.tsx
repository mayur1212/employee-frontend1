import "./globals.css";
import ApolloWrapper from "@/apollo/ApolloWrapper";

export const metadata = {
  title: "Employee Management",
  description: "Apollo Client Example",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen bg-gray-50 font-sans">
        <ApolloWrapper>
          {children}
        </ApolloWrapper>
      </body>
    </html>
  );

}

