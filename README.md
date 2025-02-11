# Gaushala

## Overview

Gaushala is a customer relationship management (CRM) system developed by **AG Solutions**. This application is designed to streamline operations for managing donor, Master, recepits, reports, and more. The project is built using **React (Vite)** and integrates several libraries for UI components, state management, charts, and API handling.

## Features

- **User Authentication** (Sign In, Sign Up, Forget Password)
- **Dashboard** for data visualization
- **User Management** with role-based access control
- **Master Data Management** for item, vendors, occasion, etc.
- **Recepits Processing** with Cash, and Material recepits
- **Reports Module** for generating detailed reports
- **Animal Stock Management** for handling Stock
- **UI Components** using MUI, and Tailwind CSS
- **Charts and Data Visualization** with ApexCharts and Chart.js

## Tech Stack

- **Frontend**: React (Vite)
- **UI Libraries**: MUI, Tailwind CSS
- **State Management**: React Context API, React Query
- **Routing**: React Router
- **Data Handling**: Axios, Lodash
- **Charting**: ApexCharts, Chart.js
- **PDF & Reports**: jsPDF, html2pdf.js
- **Security**: JWT Authentication, CryptoJS

## Installation & Setup

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Git](https://git-scm.com/)

### Steps to Run the Project

1. Clone the repository:
   ```sh
   git clone https://github.com/AG-Solutions-Bangalore/gaushala-crm.git
   cd gaushala-crm
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
   The app will be accessible at `http://localhost:5173`.

### Build for Production

To generate the production build, run:

```sh
npm run build
```

## project Stucture

+---public
ª ª vite.svg
ª ª  
ª +---img
ª github.svg
ª  
+---src
ª App.css
ª App.jsx
ª index.css
ª main.jsx
ª test2.jsx
ª test3.jsx
ª  
 +---assets
ª img1.jpg
ª img2.jpg
ª img3.jpg
ª logo.jpg
ª mainpage.jpg
ª react.svg
ª  
 +---base
ª BaseUrl.jsx
ª  
 +---components
ª ª ButtonComponents.jsx
ª ª DashboardNavbar.jsx
ª ª DeliveryFilter.jsx
ª ª EnquiryFilter.jsx
ª ª Footer.jsx
ª ª Logout.jsx
ª ª ProtectedRoute.jsx
ª ª RequestFilter.jsx
ª ª SideNav.jsx
ª ª TaskManagerFilter.jsx
ª ª  
 ª +---common
ª ª AnimalStockFilter.jsx
ª ª Buttoncss.jsx
ª ª DisableRightClick.jsx
ª ª DropDown.jsx
ª ª EncryptDecrypt.jsx
ª ª PageTitle.jsx
ª ª year.jsx
ª ª  
 ª +---dataCard
ª ª CommonCard.jsx
ª ª  
 ª +---TextField
ª FamilyDropDown.jsx
ª TextField.jsx
ª textfield.module.css
ª  
 +---images
ª favicon.ico
ª  
 +---layout
ª Layout.jsx
ª  
 +---pages
ª ª test.jsx
ª ª  
 ª +---AnimalStock
ª ª +---Animal
ª ª ª Animal.jsx
ª ª ª CreateAnimal.jsx
ª ª ª EditAnimal.jsx
ª ª ª  
 ª ª +---AnimalBornArrival
ª ª ª AnimalBornArrival.jsx
ª ª ª CreateBornArrival.jsx
ª ª ª  
 ª ª +---AnimalDead
ª ª ª AnimalDead.jsx
ª ª ª CreateAnimalDead.jsx
ª ª ª  
 ª ª +---AnimalMeat
ª ª ª AnimalMeat.jsx
ª ª ª CreateAnimalMeat.jsx
ª ª ª EditAnimalMeat.jsx
ª ª ª  
 ª ª +---AnimalStocks
ª ª AnimalStocks.jsx
ª ª AnimalStocksView.jsx
ª ª  
 ª +---auth
ª ª ForgetPassword.jsx
ª ª SignIn.jsx
ª ª SIgnUp.jsx
ª ª  
 ª +---dashboard
ª ª Home.jsx
ª ª TotalOrderStats.jsx
ª ª  
 ª +---DonorList
ª ª ª AddDonorList.jsx
ª ª ª CashRecepitAll.jsx
ª ª ª CashRecepitList.jsx
ª ª ª CommonListing.jsx
ª ª ª CreateDonorCashRecepit.jsx
ª ª ª CreateDonorMaterialRecepit.jsx
ª ª ª DonorDetails.jsx
ª ª ª DonorList.jsx
ª ª ª DonorReceiptsDetails.jsx
ª ª ª EditDonorList.jsx
ª ª ª FamilyGroupModa.jsx
ª ª ª MaterialRecepitAll.jsx
ª ª ª ViewDonorDetails.jsx
ª ª ª  
 ª ª +---Duplicate
ª ª ª ConvertDuplicate.jsx
ª ª ª DuplicateDonorList.jsx
ª ª ª EditDuplicate.jsx
ª ª ª FamilyDonorDuplicate.jsx
ª ª ª  
 ª ª +---FamilyMembers
ª ª AddFamilyMembers.jsx
ª ª FamilyList.jsx
ª ª  
 ª +---Dowloads
ª ª +---Consumption
ª ª ª DowloadConsumption.jsx
ª ª ª  
 ª ª +---Delivery
ª ª ª Cash.jsx
ª ª ª  
 ª ª +---Donor
ª ª ª Donor.jsx
ª ª ª  
 ª ª +---MaterialReceipts
ª ª ª MaterialReceipts.jsx
ª ª ª  
 ª ª +---Purchase
ª ª ª CashPurchase.jsx
ª ª ª  
 ª ª +---WebDonation
ª ª DownloadWebDonation.jsx
ª ª  
 ª +---download
ª ª DeliveryDownload.jsx
ª ª EnquiryDownload.jsx
ª ª  
 ª +---maintenance
ª ª Maintenance.jsx
ª ª  
 ª +---Master
ª ª +---ListItem
ª ª ª AddItem.jsx
ª ª ª EditList.jsx
ª ª ª List Item.jsx
ª ª ª  
 ª ª +---Occasion
ª ª ª AddOccasion.jsx
ª ª ª EditOccasion.jsx
ª ª ª ListOccasion.jsx
ª ª ª  
 ª ª +---Vendors List
ª ª AddVendors.jsx
ª ª EditVendors.jsx
ª ª VendorList.jsx
ª ª  
 ª +---profile
ª ª ChangePassword.jsx
ª ª Profile.jsx
ª ª  
 ª +---Recepits
ª ª +---CashRecepits
ª ª ª AddEmail.jsx
ª ª ª CashRecepit.jsx
ª ª ª EditRecepits.jsx
ª ª ª ViewRecepit.jsx
ª ª ª  
 ª ª +---MaterialRecepits
ª ª EditMaterial.jsx
ª ª MaterialRecepits.jsx
ª ª ViewMaterial.jsx
ª ª  
 ª +---Reports
ª ª ª StockReport.jsx
ª ª ª ViewStockSummary.jsx
ª ª ª  
 ª ª +---DonationSummary
ª ª DonationSummary.jsx
ª ª DonationSummaryView.jsx
ª ª  
 ª +---Stock
ª ª +---Consumption
ª ª ª Addconsumption.jsx
ª ª ª consumption.jsx
ª ª ª EditConsumption.jsx
ª ª ª  
 ª ª +---Purchase
ª ª ª AddPurchase.jsx
ª ª ª EditPurchase.jsx
ª ª ª PurchaseList.jsx
ª ª ª  
 ª ª +---StockList
ª ª StockList.jsx
ª ª  
 ª +---userManagement
ª ª ButtonControl.jsx
ª ª CreateButton.jsx
ª ª PageControl.jsx
ª ª TabIndex.jsx
ª ª  
 ª +---WebDonation
ª WebDonation.jsx

    +---utils
            ContextPanel.jsxmake this stucryre and give me to implement in readme file

## Available Scripts

| Command           | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the development server     |
| `npm run build`   | Build for production             |
| `npm run preview` | Preview the production build     |
| `npm run lint`    | Run ESLint to check code quality |

## Dependencies

### Main Dependencies

- **React** (UI framework)
- **React Router** (Routing)
- **Axios** (API requests)
- **MUI** (UI components)
- **React Query** (State management)
- **Chart.js & ApexCharts** (Charts)
- **Lodash & Moment.js** (Utilities)
- **jsPDF & pdfmake** (PDF generation)

### Dev Dependencies

- **Vite** (Development server)
- **ESLint** (Code linting)
- **Tailwind CSS** (Utility-first CSS framework)

## Contribution Guidelines

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes with meaningful messages.
4. Push to your fork and create a Pull Request.

## License

This project is owned by **AG Solutions Private Property** and is not open-source.

## Contact

For any queries, contact **AG Solutions Private Property** at:
📧 Email: info@ag-solutions.in
🌐 Website: [www.ag-solutions.in](https://ag-solutions.in/)

---

> _Gaushala - A Complete CRM Solution for Businesses_
