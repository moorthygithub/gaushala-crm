import axios from "axios";
import { useEffect, useState } from "react";
import { IoIosPrint } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { BaseUrl } from "../../../base/BaseUrl";
import {
  PdfDownloadInMaterialRecepit,
  WhatsappInMaterialRecepit,
} from "../../../components/ButtonComponents";
import { inputClass } from "../../../components/common/Buttoncss";
import Layout from "../../../layout/Layout";

function ViewMaterialRecepit() {
  const [receipts, setReceipts] = useState(null);
  const [company, setCompany] = useState({});
  const [donor, setDonor] = useState(null);
  const [recepitsub, setRecepitsub] = useState([]);
  const { id } = useParams();

  const [emailloading, setEmailloading] = useState(false);

  // Fetch data on component mount
  useEffect(() => {
    axios({
      url: `${BaseUrl}/fetch-m-receipt-by-id/${id}`,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        setReceipts(res?.data?.receipts || {});
        setCompany(res?.data?.company || {});
        setDonor(res?.data?.donor || {});
        setRecepitsub(res?.data?.receiptSub || []);
      })
      .catch((error) => {
        console.error("Error fetching receipt data:", error);
        toast.error("Failed to fetch receipt data.");
      });
  }, [id]);

  // Handle receipt download
  const downloadReceipt = (e) => {
    e.preventDefault();
    const downloadUrl = BaseUrl + "/download-receiptsm/" + id;
    window.location.href = downloadUrl;
    toast.success("Receipt Downloaded Successfully");
  };

  // Handle sending email
  const sendEmail = (e) => {
    e.preventDefault();
    setEmailloading(true);

    axios({
      url: BaseUrl + "/send-receiptm/" + id,
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(() => {
        toast.success("Email Sent Successfully");
        setEmailloading(false);
      })
      .catch(() => {
        toast.error("Failed to send email.");
        setEmailloading(false);
      });
  };

  // Handle printing receipt
  const printReceipt = (e) => {
    e.preventDefault();
    window.open(BaseUrl + "/print-receiptm/" + id, "_blank");
  };

  // Handle WhatsApp link
  const whatsApp = (e) => {
    e.preventDefault();
    if (donor?.donor_whatsapp) {
      const phoneNumber = donor.donor_whatsapp;
      const message = "Hello!";
      const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
        message
      )}`;
      window.open(whatsappLink, "_blank");
    } else {
      toast.error("Donor's WhatsApp number is not available.");
    }
  };

  return (
    <Layout>
      <ToastContainer />
      <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row justify-between items-center p-2 gap-4">
          <h1 className="text-2xl text-[#464D69] font-semibold">
            Material Receipt
          </h1>
          <div className="flex space-x-3">
            <div className="flex flex-col md:flex-row justify-center md:justify-end items-center space-y-4 md:space-y-0 md:space-x-4">
              <PdfDownloadInMaterialRecepit
                onClick={downloadReceipt}
                className=" text-sm font-[400] cursor-pointer   text-white bg-blue-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
              />
              <WhatsappInMaterialRecepit
                onClick={whatsApp}
                className=" text-sm font-[400] cursor-pointer   text-white bg-green-600 hover:bg-red-700 p-2 rounded-lg shadow-md"
              />
              {/* Email Section */}
              {donor?.donor_email ? (
                <div
                  className={`${inputClass} flex flex-col items-center text-center`}
                >
                  <a
                    onClick={sendEmail}
                    className="flex items-center space-x-2"
                  >
                    <MdEmail className="text-lg" />
                    <span>
                      {emailloading ? "Sending..." : "Send Email"}

                      {receipts?.m_receipt_email_count == null
                        ? "(0)"
                        : `(${receipts.m_receipt_email_count})`}
                    </span>{" "}
                  </a>
                </div>
              ) : (
                <p style={{ color: "red" }} className="cursor-pointer">
                  <i className="mr-10 ti-email"></i> Email not found
                </p>
              )}

              <button
                className={`${inputClass} flex  justify-center items-center gap-1`}
                onClick={printReceipt}
              >
                <IoIosPrint className="text-lg" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>

        {receipts && (
          <div>
            <hr />

            {/* Receipt Details */}
            <div className="flex justify-center mt-2">
              <div className="p-4 w-full max-w-[90%] md:max-w-[80%] lg:max-w-[70%]">
                <div className="border border-black">
                  <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-16">
                    <div className="border-b border-r border-black px-4 py-2 flex items-center">
                      <strong>Receipt No:</strong>
                      <p className="text-[#2677d6] font-bold text-sm ml-2">
                        {receipts.m_receipt_no}
                      </p>
                    </div>
                    <div className="border-b border-black px-4 py-2 flex items-center">
                      <strong>Date:</strong>
                      <p className="text-[#2677d6] font-bold text-sm ml-2">
                        {new Date(receipts.m_receipt_date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="border-b border-black px-4 py-2 h-auto md:h-16 flex items-center">
                    <strong>Received with thanks from:</strong>
                    <p className="text-[#2677d6] font-bold text-sm ml-2">
                      {donor?.donor_title} {donor?.donor_full_name},{" "}
                      {donor?.donor_city} - {donor?.donor_pin_code},{" "}
                      {donor?.donor_state}
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-16">
                    <div className="border-b border-r border-black px-4 py-2 flex items-center">
                      <strong>Vehicle:</strong>
                      <p className="text-[#2677d6] font-bold text-sm ml-2">
                        {receipts.m_receipt_vehicle_no}
                      </p>
                    </div>
                    <div className="border-b border-black px-4 py-2 h-auto md:h-16 flex items-center">
                      <strong>Occasion of:</strong>
                      <p className="text-[#2677d6] font-bold text-sm ml-2">
                        {receipts.m_receipt_occasional}
                      </p>
                    </div>
                  </div>

                  <div className="border-b border-black px-4 py-2 h-auto md:h-16 flex items-center">
                    <strong>On Account of:</strong>
                    {recepitsub.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <p className="text-[#2677d6] font-bold text-sm ml-2">
                          {item.purchase_sub_item} - {item.purchase_sub_qnty},{" "}
                          {item.purchase_sub_unit}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-16">
                    <div className="border-black px-4 py-2 flex items-center">
                      <strong>Donor Sign:</strong>
                      <p className="text-[#2677d6] font-bold text-sm ml-2">
                        {donor?.donor_title
                          ? `(${donor?.donor_title} ${donor?.donor_full_name})`
                          : ""}
                      </p>
                    </div>
                    <div className="border-black px-4 py-2 flex items-center">
                      <strong>Receiver Sign:</strong>
                      <p className="text-[#2677d6] font-bold text-sm ml-2">
                        {company?.company_authsign
                          ? `(${company?.company_authsign} )`
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ViewMaterialRecepit;
