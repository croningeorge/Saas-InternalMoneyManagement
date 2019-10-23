import { AppSidebarNavItemComponent } from './shared/components/app-sidebar-nav/app-sidebar-nav.component';
export const navigation = [
  {
    name: "Dashboard",
    url: "/dashboard",
    icon: "icon-speedometer"
  },
  {
    name: "Master Data",
    url: "/master-data",
    icon: "icon-notebook",
    children: [
      {
        name: "User Types",
        url: "/master-data/user-types",
        icon: "icon-people"
      },
      {
        name: "Currencies",
        url: "/master-data/currencies",
        icon: "icon-credit-card"
      },
      {
        name: "Countries",
        url: "/master-data/countries",
        icon: "icon-flag"
      },
      {
        name: "KYC Doc Type",
        url: "/master-data/kyc-doc-Type",
        icon: "icon-star"
      },
      {
        name: "FAQ",
        url: "/master-data/faq",
        icon: "icon-question"
      },
      {
        name: 'Fund remark',
        url: '/master-data/fund-remark',
        icon: 'icon-star'
      },
      {
        name: "KYC Doc",
        url: "/master-data/kyc-doc",
        icon: "icon-star"
      }
    ]
  },
  {
    name: "Remittance Data",
    url: "/remittance-data",
    icon: "icon-credit-card",
    children: [
      {
        name: "Outlet Management",
        url: "/remittance-data/outletmanagement",
        icon: "icon-globe-alt"
      },
      {
        name: "Admin Management",
        url: "/remittance-data/outletadminmanagement",
        icon: "icon-star"
      },
      {
        name: "Order Management",
        url: "/remittance-data/ordermanagement",
        icon: "icon-star"
      },
      {
        name: "KYC Listing",
        url: "/remittance-data/kyclisting",
        icon: "icon-star"
      },
      {
        name: "Base Currency",
        url: "/remittance-data/basecurrecymanagement",
        icon: "icon-star"
      }
    ]
  },
  {
    name: "Settings Data",
    url: "/settings-data",
    icon: "icon-settings",
    children: [
      {
        name: "Terms & Conditions",
        url: "/settings-data/termsCondition",
        icon: "icon-briefcase"
      },
      {
        name: "Base Url",
        url: "/settings-data/base-url",
        icon: "icon-globe"
      },
      {
        name: "Service Time",
        url: "/settings-data/service-time",
        icon: "icon-clock"
      }
    ]
  },
  {
    name: "Logout",
    url: "/logout",
    icon: "icon-logout"
  }
];
