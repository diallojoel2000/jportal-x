import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import {
  Card,
  CardBody,
  CardHeader,
  CardTool,
  CardToolLink,
  CardTitle,
} from "../../components/Card";
import CustomerInfo from "../../components/CustomerInfo";
import Page from "../../components/layout/Page";
import { alertActions } from "../../store/alert-slice";
import { sendOtpCommand, syncDetailCommand } from "../../util/ninServices";

const GetDetailPage = () => {
  const [sendOtpState, setSendOtpState] = useState("disabled");
  const [ninTxtState, setNinTxtState] = useState("");
  const ninRef = useRef();
  const validationCodeRef = useRef();
  const accountNumberRef = useRef();
  const dispatch = useDispatch();

  const onSyncDetails = () => {
    if (!validationCodeRef.current.value) {
      dispatch(
        alertActions.showError({
          title: "Error",
          errors: { validationCode: "Validation code is required" },
        })
      );
      return;
    }
    if (!accountNumberRef.current.value) {
      dispatch(
        alertActions.showError({
          title: "Error",
          errors: { accountNumber: "Account number is required" },
        })
      );
      return;
    }

    const payload = {
      nin: ninRef.current.value,
      validationCode: validationCodeRef.current.value,
      accountNumber: accountNumberRef.current.value,
    };
    mutateSyncDetail(payload);
  };

  const onSendOtp = () => {
    if (!ninRef.current.value) {
      dispatch(
        alertActions.showError({
          title: "Error",
          errors: { nin: "NIN is required" },
        })
      );
      return;
    }

    const payload = { nin: ninRef.current.value };

    setSendOtpState("");
    setNinTxtState("disabled");

    console.log("Send OTP clicked");
    mutateSendOtp(payload);
  };

  const { mutate: mutateSyncDetail, data } = useMutation({
    mutationFn: syncDetailCommand,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error, data) => {
      dispatch(alertActions.showError(error?.info));
    },
  });

  const { mutate: mutateSendOtp } = useMutation({
    mutationFn: sendOtpCommand,
    onSuccess: (data) => {
      dispatch(alertActions.showSuccess(data));
    },
    onError: (error, data) => {
      dispatch(alertActions.showError(error?.info));
    },
  });

  return (
    <Page title="KYC Sync">
      <Card size={12}>
        <CardHeader>
          <CardTitle title="Get Customer Detail" />
        </CardHeader>
        <CardBody>
          <div className="row">
            <div className="col-6">
              <div className="col-md-12">
                <label className="form-label">National Identity Number</label>
                <div className="input-group">
                  <input
                    type="text"
                    name="nin"
                    className="form-control"
                    ref={ninRef}
                    disabled={ninTxtState}
                    required
                  />
                  <span className="input-group-append">
                    <button
                      type="button"
                      onClick={onSendOtp}
                      className="btn btn-info btn-flat"
                    >
                      Send OTP
                    </button>
                  </span>
                </div>
              </div>

              <div className="col-md-12">
                <label className="form-label">Validation Code</label>
                <input
                  type="text"
                  name="validationCode"
                  className="form-control"
                  ref={validationCodeRef}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Account Number</label>
                <input
                  type="text"
                  name="nin"
                  className="form-control"
                  ref={accountNumberRef}
                  required
                />
              </div>
              <br />
              <div className="col-md-6 offset-md-6">
                <button
                  className="btn btn-primary float-end"
                  onClick={onSyncDetails}
                  disabled={sendOtpState}
                >
                  Sync Details
                </button>
              </div>
            </div>
            <div className="col-6">{data && <CustomerInfo {...data} />}</div>
          </div>
        </CardBody>
      </Card>
    </Page>
  );
};

export default GetDetailPage;
