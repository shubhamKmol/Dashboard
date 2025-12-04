# Merchant Operations Dashboard

The Merchant Operations Dashboard is a responsive, data-driven web application designed to help operations teams monitor merchant performance, analyze risk distribution, and take quick actions on merchant accounts. It provides real-time insights through visual charts and an interactive merchant management interface with search, sorting, filtering, and validation rules aligned to real business logic. The clean dark-mode UI ensures a professional look and a smooth user experience across devices, making it a practical tool for operational decision-making and risk oversight.

---

<!-- ##  Live Demo -->
Netlify: <https://merchant-ops-dashboard.netlify.app/>

<!-- ##  Repository -->
GitHub: <https://github.com/shubhamKmol/Dashboard>

---

<!-- ##  Tech Stack -->

| Area              | Technology                           |
|-------------------|--------------------------------------|
| Framework         | React (CRA), React Router            |
| UI & Styling      | Tailwind CSS, Flowbite UI components |
| Charts            | Custom SVG-based Bar & Pie Charts    |
| Local State       | React Hooks                          |
| Deployment        | Netlify                              |
| Version Control   | Git + GitHub                         |

---

<!-- ##  Features -->

<!-- ### Dashboard -->
- 3 Key Performance Summary Stats
- Horizontal Bar Chart: Volume by Risk Level
- Horizontal Bar Chart: Merchant Counts by Status
- Pie Chart: Merchant Distribution by Country
- Fully responsive (Desktop + Mobile)

<!-- ### Merchants Page -->
- Paginated table view of merchants
- Search by merchant name
- Filter by status & risk level
- Sort by volume or chargeback ratio

<!-- ### Merchant Detail & Editing -->
- Click row → Drawer view with merchant details
- Editable fields:
  - Status
  - Risk Level
<!-- - **Business Logic Rules** -->

- If chargeback ratio > 2% → warning if Status is Active
- If Risk = High & Status switching to Active → confirmation required

<!-- ### Add Merchant -->
- Slide-in form UI (modal drawer)
- Validation:
  - Name required (min 3 characters)
  - Monthly volume > 0
  - Status & Risk Level required
  - Country required
- Updates table + dashboard instantly

 <!-- UX Enhancements -->
- Persistent dark theme
- Empty & loading states
- Accessible clickable areas & icons

---

<!-- ##  Run Locally -->

```sh
git clone https://github.com/shubhamKmol/Dashboard
cd Dashboard
npm install
npm start
