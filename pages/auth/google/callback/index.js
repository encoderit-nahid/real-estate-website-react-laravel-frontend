import Head from "next/head";
import { Box, CircularProgress, Container, Grid, Tooltip } from "@mui/material";

import { useSession, signIn, signOut } from "next-auth/react";
// import { _baseURL } from "../consts";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { apiInstance, socialLoginApi, userDetailsApi } from "@/api";
import useWindowDimensions from "@/hooks/useCurrentDisplaySize";

export default function Google({ roleId }) {
  const { data: session } = useSession();

  const router = useRouter();
  const { query } = router;

  console.log({ roleId });

  //   if (typeof window !== "undefined") {
  //     // Access localStorage here
  //     const roleId = localStorage.getItem("role_id");
  //     console.log({ roleId });
  //   }

  console.log({ query });

  useEffect(() => {
    const getData = async () => {
      query["role_id"] = roleId;
      console.log({ query });
      const [errorAuth, responseAuth] = await socialLoginApi(query, "google");
      if (!errorAuth) {
        localStorage.setItem("token", responseAuth?.data?.token);
        apiInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${responseAuth?.data?.token}`;
        const [error, response] = await userDetailsApi();
        if (!error) {
          signIn("credentials", {
            userId: response?.data?.user?.id,
            userEmail: response?.data?.user?.email,
            name: response?.data?.user?.name,
            phone: response?.data?.user?.phone,
            status: response?.data?.user?.status,
            role: response?.data?.user?.roles[0]?.slug,
            roleId: response?.data?.user?.roles[0]?.id,
            userImage: response?.data?.user?.attachments[0]?.file_path,
            callbackUrl:
              response.data.user.roles[0].slug === "buyer"
                ? "/"
                : "/my-properties",
          });
        }
        // else {
        //   router.replace({ pathname: "/" });
        // }
      } else {
        console.log(errorAuth?.response);
        localStorage.setItem(
          "registration_id",
          errorAuth?.response?.data?.user?.id
        );
        localStorage.setItem(
          "user_role",
          errorAuth?.response?.data?.role === "3"
            ? "owner"
            : errorAuth?.response?.data?.role === "2"
            ? "broker"
            : "buyer"
        );
        localStorage.setItem(
          "Reg_user_name",
          errorAuth?.response?.data?.user?.name
        );
        router.replace({
          pathname: "/other-information",
        });
      }
    };

    getData();
  }, []);

  const { height } = useWindowDimensions();

  return (
    <div>
      <Head>
        <title>Lokkan - A imobiliária digital</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/negotiate.png" />
      </Head>

      <main className="section">
        <Container maxWidth="md" sx={{ px: 2, py: 0 }}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100vh" }}
          >
            <CircularProgress size="8rem" />
          </Grid>
        </Container>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const cookies = context.req.cookies["role_id"];

  return {
    props: { roleId: cookies }, // will be passed to the page component as props
  };
}
