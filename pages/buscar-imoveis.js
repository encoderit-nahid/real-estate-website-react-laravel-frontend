import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("@/component/shared/Navbar/Navbar"), {
  ssr: false,
});
import Head from "next/head";
import { Box } from "@mui/material";
import React, { useState } from "react";
import en from "locales/en";
import pt from "locales/pt";
const SearchList = dynamic(() => import("@/component/searchList/SearchList"), {
  ssr: false,
});

export default function SearchRealEstate({
  loginOpen,
  setLoginOpen,
  handleLoginOpen,
  handleLoginClose,
  propertyData,
  language,
}) {
  const [myValue, setMyValue] = useState(language || "pt");

  const t = myValue === "en" ? en : pt;

  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Navbar
          shape={false}
          paddingY={"1vh"}
          loginOpen={loginOpen}
          setLoginOpen={setLoginOpen}
          handleLoginClose={handleLoginClose}
          handleLoginOpen={handleLoginOpen}
          languageName={language}
          setMyValue={setMyValue}
          myValue={myValue}
          colorLogo={true}
        />
        <Box>
          <SearchList
            propertyData={propertyData}
            language={language}
            handleLoginOpen={handleLoginOpen}
          />
        </Box>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const base_url = process.env.NEXT_PUBLIC_API_URL;
  const queryValue = context.query;

  var url = new URL(`${base_url}/api/property/index`),
    params = { ...context.query, status: "approved" };
  Object.keys(params).forEach((key) =>
    url.searchParams.append(key, params[key])
  );
  const res = await fetch(url);
  console.log("🟥 ~ getServerSideProps ~ res:", res);
  const data = await res.json();
  const cookies = context.req.cookies["language"] || "pt";
  return {
    props: {
      propertyData: data,
      query: queryValue,
      language: cookies,
    },
  };
}
