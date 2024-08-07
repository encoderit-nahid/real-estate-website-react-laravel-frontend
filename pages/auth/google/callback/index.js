import Head from "next/head";
import { CircularProgress, Container, Grid } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { apiInstance, socialLoginApi, userDetailsApi } from "@/api";
import toast from "react-hot-toast";

const clearMultipleCookies = (cookieNames) => {
  cookieNames.forEach((name) => {
    clearCookie(name);
  });
};

export default function Google({
  roleId,
  type,
  date,
  time,
  brlValue,
  propertyId,
  paymentType,
  cashAmount,
  paymentPerInstallment,
  noOfInstallment,
}) {
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    const getData = async () => {
      if (type === "schedule") {
        query["role_id"] = roleId;
        query["type"] = type;
        query["date"] = date;
        query["time"] = time;
        query["property_id"] = propertyId;
      } else {
        query["role_id"] = roleId;
        query["type"] = type;
        query["brl_value"] = brlValue;
        query["property_id"] = propertyId;
        query["payment_type"] = paymentType;
        query["cash_amount"] = cashAmount;
        query["payment_per_installment"] = paymentPerInstallment;
        query["no_of_installment"] = noOfInstallment;
      }
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
            callbackUrl: "/my-properties",
          });
          clearMultipleCookies([
            "role_id",
            "type",
            "date",
            "time",
            "brl_value",
            "property_id",
          ]);
        }
      } else {
        console.log(errorAuth?.response);
        if (errorAuth.response.status === 402) {
          toast.error(errorAuth?.response?.data?.message);
          router.replace({
            pathname: "/",
          });
        } else {
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
      }
    };

    getData();
  }, []);

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
  // const cookies = context.req.cookies["role_id"];
  const {
    role_id,
    type,
    date,
    time,
    brl_value,
    property_id,
    payment_type,
    cash_amount,
    payment_per_installment,
    no_of_installment,
  } = context.req.cookies;

  return {
    props: {
      roleId: role_id,
      type: type,
      date: date,
      time: time,
      brlValue: brl_value,
      propertyId: property_id,
      paymentType: payment_type,
      cashAmount: cash_amount,
      paymentPerInstallment: payment_per_installment,
      noOfInstallment: no_of_installment,
    }, // will be passed to the page component as props
  };
}
