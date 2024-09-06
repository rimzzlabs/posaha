import { PublicWrapper } from "@/layouts/wrappers";
import { SignInContainer } from "@/modules/auth/signin";
import { PublicHeaderContainer } from "@/modules/shared/public-header";
import { Fragment } from "react";

export default function SigninPage() {
  return (
    <Fragment>
      <PublicHeaderContainer />
      <PublicWrapper>
        <SignInContainer />
      </PublicWrapper>
    </Fragment>
  );
}
