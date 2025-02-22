import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdKeyboardBackspace, MdDelete } from "react-icons/md";
import axios from "axios";
import Layout from "../../layout/Layout";
import Fields from "../../components/common/TextField/TextField";
import { toast } from "react-toastify";
import { BaseUrl } from "../../base/BaseUrl";
import { Button } from "@material-tailwind/react";
import { Autocomplete, TextField } from "@mui/material";
import { inputClass, inputClassBack } from "../../components/common/Buttoncss";
import { AddDonor } from "../../components/ButtonComponents";
import { id } from "date-fns/locale/id";
import moment from "moment";

const unitOptions = [
  { value: "Kg", label: "Kg" },
  { value: "Ton", label: "Ton" },
  { value: "Bag", label: "Bag" },
];

const MaterialRecepitAll = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [items, setItems] = useState([]);

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0");
  var yyyy = today.getFullYear();

  today = mm + "/" + dd + "/" + yyyy;
  var todayback = yyyy + "-" + mm + "-" + dd;
  var d = document.getElementById("datefield");
  if (d) {
    document.getElementById("datefield").setAttribute("max", todayback);
  }

  var todayyear = new Date().getFullYear();
  var twoDigitYear = todayyear.toString().substr(-2);
  var preyear = todayyear;
  var finyear = +twoDigitYear + 1;
  var finalyear = preyear + "-" + finyear;
  const [userdata, setUserdata] = useState("");

  const [dayClose, setDayClose] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [check, setCheck] = useState(false);

  // useEffect(() => {
  //   var theLoginToken = localStorage.getItem("token");
  //   const requestOptions = {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + theLoginToken,
  //     },
  //   };

  //   fetch(BaseUrl + "/fetch-m-receipt-date", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => setDayClose(data.latestdate.c_receipt_date));
  // }, []);
  useEffect(() => {
    const fetchReceiptDate = async () => {
      try {
        const theLoginToken = localStorage.getItem("token");

        const requestOptions = {
          method: "GET",
          headers: {
            Authorization: "Bearer " + theLoginToken,
          },
        };

        const response = await fetch(
          BaseUrl + "/fetch-m-receipt-date",
          requestOptions
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setDayClose(data.latestdate.c_receipt_date);
        if (data.code == 200) {
          toast.success(data.msg);
        } else {
        }
        toast.error(data.msg);
      } catch (error) {
        console.error("Error fetching receipt date:", error.message);
      }
    };

    fetchReceiptDate();
  }, []);

  const [donor, setDonor] = useState({
    indicomp_fts_id: "",
    donor_fts_id: "",
    m_receipt_financial_year: "",
    m_receipt_date: check ? dayClose : dayClose,
    m_receipt_total_amount: "",
    m_receipt_tran_pay_mode: "",
    m_receipt_tran_pay_details: "",
    m_receipt_email_count: "",
    m_receipt_count: "",
    m_receipt_reason: "",
    m_receipt_remarks: "",
    m_receipt_sub_data: "",
    m_receipt_occasional: "",
    m_manual_receipt_no: "",
    m_receipt_vehicle_no: "",
  });

  const useTemplate = {
    m_receipt_sub_item: "",
    m_receipt_sub_quantity: "",
    m_receipt_sub_unit: "",
    m_receipt_sub_amount: "",
  };
  const [donorListData, setDonorListData] = useState([]);

  const [users, setUsers] = useState([useTemplate]);
  const [fabric_inward_count, setCount] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  //fetch year
  const [currentYear, setCurrentYear] = useState("");
  useEffect(() => {
    const fetchYearData = async () => {
      try {
        const response = await axios.get(`${BaseUrl}/fetch-year`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setCurrentYear(response.data.year.current_year);
        console.log(response.data.year.current_year);
      } catch (error) {
        console.error("Error fetching year data:", error);
      }
    };

    fetchYearData();
  }, []);

  useEffect(() => {
    const fetchOpenData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BaseUrl}/fetch-donor-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setDonorListData(response?.data?.donor);
      } catch (error) {
        console.error("Error fetching open list enquiry data", error);
      }
    };

    fetchOpenData();
  }, []);
  //FETCH OCCASION
  const [occasion, setOccasion] = useState([]);
  useEffect(() => {
    var theLoginToken = localStorage.getItem("token");
    const requestOptions = {
      method: "GET",
      headers: {
        Authorization: "Bearer " + theLoginToken,
      },
    };

    fetch(BaseUrl + "/fetch-occasion", requestOptions)
      .then((response) => response.json())
      .then((data) => setOccasion(data.occasion));
  }, []);
  // Fetch vendors and items on mount
  useEffect(() => {
    const fetchVendorData = async () => {
      const response = await axios.get(`${BaseUrl}/fetch-vendor`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setVendors(response.data.vendor);
    };

    const fetchItemData = async () => {
      const response = await axios.get(`${BaseUrl}/fetch-item`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setItems(response.data.item);
    };

    fetchVendorData();
    fetchItemData();

    const dateField = document.getElementById("datefield");
    if (dateField) {
      dateField.setAttribute("max", todayback);
    }
  }, [todayback]);

  const addItem = () => {
    setUsers([...users, useTemplate]);
    setCount(fabric_inward_count + 1);
  };

  const removeUser = (index) => {
    const filteredUsers = [...users];
    filteredUsers.splice(index, 1);
    setUsers(filteredUsers);
    setCount(fabric_inward_count - 1);
  };
  const validateOnlyDigits = (inputtxt) => {
    var phoneno = /^\d+$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };
  const onInputChange = (e) => {
    if (e.target.name == "m_receipt_total_amount") {
      if (validateOnlyDigits(e.target.value)) {
        setDonor({
          ...donor,
          [e.target.name]: e.target.value,
        });
      }
    } else {
      setDonor({
        ...donor,
        [e.target.name]: e.target.value,
      });
    }
  };

  const validateOnlyNumber = (inputtxt) => {
    var phoneno = /^\d*\.?\d*$/;
    if (inputtxt.match(phoneno) || inputtxt.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  //ONCHNAGE FOR USER
  const onChange = (e, index) => {
    if (e.target.name == "m_receipt_sub_quantity") {
      if (validateOnlyNumber(e.target.value)) {
        const updatedUsers = users.map((user, i) =>
          index == i
            ? Object.assign(user, { [e.target.name]: e.target.value })
            : user
        );
        setUsers(updatedUsers);
      }
    } else {
      const updatedUsers = users.map((user, i) =>
        index == i
          ? Object.assign(user, { [e.target.name]: e.target.value })
          : user
      );
      setUsers(updatedUsers);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!selectedDonor || !selectedDonor.donor_fts_id) {
      setError(true);
      return;
    } else {
      setError(false);
      console.log("Form submitted with selected donor:", selectedDonor);

      let data = {
        indicomp_fts_id: donor.donor_fts_id,
        m_receipt_financial_year: currentYear,
        m_receipt_date: check ? dayClose : dayClose,
        m_receipt_total_amount: donor.m_receipt_total_amount,
        m_receipt_tran_pay_mode: donor.m_receipt_tran_pay_mode,
        m_receipt_tran_pay_details: donor.m_receipt_tran_pay_details,
        m_receipt_remarks: donor.m_receipt_remarks,
        m_receipt_reason: donor.m_receipt_reason,
        m_receipt_email_count: donor.m_receipt_email_count,
        m_manual_receipt_no: donor.m_manual_receipt_no,
        m_receipt_count: fabric_inward_count,
        m_receipt_sub_data: users,
        m_receipt_vehicle_no: donor.m_receipt_vehicle_no,
        m_receipt_occasional: donor.m_receipt_occasional,
      };
      console.log(data, "MATERIAL DATA");
      const isValid = document.getElementById("addIndiv").checkValidity();

      if (isValid) {
        setIsButtonDisabled(true);

        axios
          .post(`${BaseUrl}/create-m-receipt`, data, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
          .then((res) => {
            if (res.status == 200 && res.data.code == "200") {
              //   toast.success("Donor Created Successfully");
              navigate(`/material-view/${res.data.latestid.id}`);
            } else {
              toast.error(res.data.message || "Error occurred");
            }
          })
          .catch((err) => {
            if (err.response) {
              toast.error(
                `Error: ${
                  err.response.data.message || "An error occurred on the server"
                }`
              );
              console.error("Server Error:", err.response);
            } else if (err.request) {
              toast.error("No response from the server.");
              console.error("No Response:", err.request);
            } else {
              toast.error(`Error: ${err.message}`);
              console.error("Error Message:", err.message);
            }
          })
          .finally(() => {
            setIsButtonDisabled(false);
          });
      }
    }
  };

  const handleBackButton = () => {
    navigate("/donor-list");
  };

  useEffect(() => {
    if (donor && donor.donor_fts_id) {
      axios({
        url: `${BaseUrl}/fetch-donor-by-id/${donor.donor_fts_id}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => {
          setUserdata(res.data.donor);
          console.log("Selected Donor Data", res.data.donor);
        })
        .catch((error) => {
          console.error("Error fetching donor data", error);
        });
    }
  }, [donor?.donor_fts_id]);
  //DAY CLOSE

  //DAY close
  const onDayClose = (e) => {
    e.preventDefault();
    setCheck(true);

    const receivedDate = new Date(dayClose);

    if (isNaN(receivedDate)) {
      console.error("Invalid dayClose date:", dayClose);
      return;
    }

    receivedDate.setDate(receivedDate.getDate() + 1);

    const year = receivedDate.getFullYear();
    const month = String(receivedDate.getMonth() + 1).padStart(2, "0"); // Get month from 0-11, add 1 and pad with zero
    const day = String(receivedDate.getDate()).padStart(2, "0"); // Get day and pad with zero

    const formattedDate = `${year}-${month}-${day}`;
    console.log(formattedDate, "formattedDate");
    let data = {
      c_receipt_date: formattedDate,
    };

    // Making the API call
    axios({
      url: BaseUrl + "/update-m-receipt-date/2",
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.data.code == 200) {
          toast.error(res.data.msg);
          setDayClose(res.data.latestdate.c_receipt_date);
        } else {
          console.log(res.data, "dayclose");
          toast.error(res.data.msg);
        }

        // setDayClose(res.data.latestdate.c_receipt_date);
      })
      .catch((error) => {
        console.error("Error updating receipt date:", error);
      });
  };
  const isValidDate = (dateString) => {
    const parsedDate = Date.parse(dateString);
    return !isNaN(parsedDate);
  };

  const onDayOpen = (e) => {
    e.preventDefault();
    setCheck(true);
    const receivedDate = new Date(dayClose);
    receivedDate.setDate(receivedDate.getDate() - 1);

    const year = receivedDate.getFullYear();
    const month = String(receivedDate.getMonth() + 1).padStart(2, "0");
    const day = String(receivedDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    let data = {
      c_receipt_date: formattedDate,
    };
    axios({
      url: BaseUrl + "/update-m-receipt-date-open/2",
      method: "PUT",
      data,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.data.code == 401) {
        toast.error(res.data.msg);
      } else {
        setDayClose(res.data.latestdate.c_receipt_date);
      }
    });
  };
  const [selectedDonor, setSelectedDonor] = useState(null);
  const [error, setError] = useState(false);
  const handleDonorChange = (selectedDonor) => {
    console.log(selectedDonor.donor_fts_id);
    setSelectedDonor(selectedDonor);
    setError(false);
    console.log(selectedDonor, "in");

    setDonor((prevDonor) => ({
      ...prevDonor,
      donor_fts_id: selectedDonor.donor_fts_id,
    }));
  };
  console.log(donor.donor_fts_id, "out");
  const pan = userdata.donor_pan_no == "" ? "NA" : userdata.donor_pan_no;

  return (
    <Layout>
      <div className="p-6 mt-5 bg-white shadow-md rounded-lg">
        <div className="flex flex-col md:flex-row items-center justify-between mb-4 mt-6">
          <div className="flex items-center">
            <h1 className="text-2xl text-[#464D69] font-semibold ml-2">
              Material Receipt
            </h1>
          </div>

          <div className="flex flex-col md:flex-row items-center md:space-x-4 mt-4 md:mt-0">
            <p className="    font-semibold text-black">
              Receipt Date: {moment(dayClose).format("DD-MM-YYYY")}({" "}
              {currentYear})
            </p>
            {localStorage.getItem("user_type_id") === "2" && (
              <button onClick={(e) => onDayOpen(e)} className={inputClass}>
                + Day Open
              </button>
            )}
            <button
              disabled={dayClose === todayback}
              onClick={dayClose !== todayback ? onDayClose : null}
              className={`${inputClass} ${
                dayClose === todayback ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              + Day Close
            </button>
          </div>
        </div>

        <div className="p-6 ">
          <form id="addIndiv" onSubmit={onSubmit}>
            <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Autocomplete
                  disablePortal
                  name="donor_fts_id"
                  options={donorListData.map((donor) => ({
                    ...donor,
                    // label: donor.donor_full_name,
                    label: `${donor.donor_full_name} (${donor.donor_mobile})`,
                    id: donor.donor_fts_id,
                  }))}
                  loading={donorListData.length === 0}
                  noOptionsText={
                    <span className="flex items-center justify-between w-full">
                      No Donor
                      <AddDonor
                        onClick={() => navigate("/add-donor")}
                        className={inputClass}
                      />
                    </span>
                  }
                  renderOption={(props, option) => (
                    <li {...props} key={option.id}>
                      {option.label}
                    </li>
                  )}
                  isOptionEqualToValue={(option, value) =>
                    option.donor_fts_id === value.donor_fts_id
                  }
                  onChange={(event, selectedOption) =>
                    handleDonorChange(selectedOption)
                  }
                  rules={{ required: true }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Select Donor"
                      error={error} // Show error if validation fails
                      helperText={error ? "Please select a donor" : ""}
                      sx={{
                        "& .MuiInputBase-root": {
                          height: 40,
                          fontSize: "1rem",
                        },
                      }}
                    />
                  )}
                  loadingText="Loading donors..."
                />
              </div>

              <div className="flex items-center">
                <h3 className="text-md font-semibold text-black">
                  Pan No: {pan || "N/A"}
                </h3>
              </div>

              <div className="flex items-center">
                <h3 className="text-md font-semibold text-black">
                  Mobile: {userdata.donor_mobile || "N/A"}
                </h3>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
              {/* Purchase Details */}
              <div>
                <Fields
                  type="textField"
                  label="Approx Value"
                  name="m_receipt_total_amount"
                  value={donor.m_receipt_total_amount}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <Fields
                  type="textField"
                  label="Vehicle No"
                  name="m_receipt_vehicle_no"
                  value={donor.m_receipt_vehicle_no}
                  onChange={onInputChange}
                />
              </div>

              <div>
                <Fields
                  select
                  title="On Occasion"
                  type="occasionDropdown"
                  name="m_receipt_occasional"
                  value={donor.m_receipt_occasional}
                  onChange={onInputChange}
                  options={occasion}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="md:col-span-2">
                <Fields
                  type="textField"
                  name="m_receipt_remarks"
                  value={donor.m_receipt_remarks}
                  onChange={onInputChange}
                  label="Remarks"
                />
              </div>

              <div className="mb-4">
                <Fields
                  type="textField"
                  name="m_manual_receipt_no"
                  value={donor.m_manual_receipt_no}
                  onChange={onInputChange}
                  label="Manual Receipt No"
                />
              </div>
            </div>

            {/* Line Items */}
            {users.map((user, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4"
              >
                <div className="md:col-span-2">
                  <Fields
                    required
                    select
                    title="Item"
                    type="itemdropdown"
                    value={user.m_receipt_sub_item}
                    name="m_receipt_sub_item"
                    onChange={(e) => onChange(e, index)}
                    options={items}
                  />
                </div>

                <Fields
                  required
                  label="Quantity"
                  type="textField"
                  value={user.m_receipt_sub_quantity}
                  name="m_receipt_sub_quantity"
                  onChange={(e) => onChange(e, index)}
                />
                <Fields
                  required
                  select
                  title="Unit"
                  type="whatsappDropdown"
                  name="m_receipt_sub_unit"
                  value={user.m_receipt_sub_unit}
                  onChange={(e) => onChange(e, index)}
                  options={unitOptions}
                />
                <div
                  className="flex justify-start text-2xl text-red-500 bg-white cursor-pointer"
                  onClick={() => removeUser(index)}
                >
                  {/* <IconButton
                    className="text-red-500 bg-white"
                  
                  > */}
                  <MdDelete />
                  {/* </IconButton> */}
                </div>
              </div>
            ))}

            <div className="display-flex justify-start ">
              <button
                onClick={addItem}
                className={inputClass}
                // disabled={isAddMoreDisabled()}
              >
                Add More
              </button>
            </div>
            <div className="flex justify-center mt-4 space-x-4">
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={inputClass}
              >
                Submit
              </button>
              <button onClick={handleBackButton} className={inputClassBack}>
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default MaterialRecepitAll;
