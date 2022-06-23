import React from "react";

// All pages that rely on 3rd party components (other than Bootstrap) are
// loaded asynchronously, to keep the initial JS bundle to a minimum size

// Layouts
import AuthLayout from "@layouts/AuthLayout";
import PrivateLayout from "@layouts/PrivateLayout";

// // Guards
// import AuthGuard from "./components/guards/AuthGuard";

// Auth
import Page500 from "@auth/Page500";
import Page404 from "@auth/Page404";
import SignIn from "@auth/SignIn";
import SignUp from "@auth/SignUp";
import ResetPassword from "@auth/ResetPassword";

//Settings
import Users from "@users/Users";
import AddEditUser from "@users/AddEditUser";
import Groups from "@groups/Groups";
import Permissions from "@permissions/Permissions";
import EmailTemplates from "@emailtemplates/EmailTemplates";
import AddEditEmailTemplate from "@emailtemplates/AddEditEmailTemplate";

//property management
import Sectors from "@sector/Sectors";
import AddEditSector from "@sector/AddEditSector";
import Sites from "@sites/Sites";
import AddEditSite from "@sites/AddEditSite";
import Levels from "@levels/Levels";
import AddEditLevel from "@levels/AddEditLevel";
import Areas from "@areas/Areas";
import AddEditArea from "@areas/AddEditArea";

//contract management
import Contracts from "@contract/contract/Contracts";
import AddEditContract from "@contract/contract/AddEditContract";

//asset management
import Assets from "@asset/Assets";
import CreateAsset from "@asset/CreateAsset";
import EditAsset from "@asset/EditAsset";

//Fault
import CallCentreFaultList from "@fault/CallCentreFaultList";
import CallCentreFaultView from "@fault/CallCentreFaultView";
import FaultResponseList from "@fault/FaultResponseList";
import FaultResponseView from "@fault/FaultResponseView";
import FaultVerificationTOList from "@fault/FaultVerificationTOList";
import FaultVerificationTOView from "@fault/FaultVerificationTOView";
import FaultVerificationNEAList from "@fault/FaultVerificationNEAList";
import FaultVerificationNEAView from "@fault/FaultVerificationNEAView";
import FaultRectifiedList from "@fault/FaultRectifiedList";
import FaultEOTRequestList from "@fault/FaultEOTRequestList";
import FaultEOTRequestView from "@fault/FaultEOTRequestView";
import FaultEOTApprovalList from "@fault/FaultEOTApprovalList";
import FaultEOTApprovalView from "@fault/FaultEOTApprovalView";
import FaultRectifiedView from "@fault/FaultRectifiedView";
import FaultIncidentReportList from "@fault/FaultIncidentReportList";
import FaultIncidentReportView from "@fault/FaultIncidentReportView";
import FaultFollowUpList from "@fault/FaultFollowUpList";
import FaultEOTView from "@fault/FaultEOTView";
import FaultSummaryList from "@fault/FaultSummaryList";

// Preventive maintenance
import { ChecklistBuild } from "@preventive/checklist-build/ChecklistBuild";
import { ChecklistType } from "@preventive/checklist-type/ChecklistType";
import { ChecklistItems } from "@preventive/checklist-items/ChecklistItems";
import { ChecklistSubItems } from "@preventive/checklist-sub-items/ChecklistSubItems";
import { ChecklistTypeAddEdit } from "@preventive/checklist-type/ChecklistTypeAddEdit";
import { ChecklistItemsAddEdit } from "@preventive/checklist-items/ChecklistItemsAddEdit";
import { ChecklistSubItemsAddEdit } from "@preventive/checklist-sub-items/ChecklistSubItemsAddEdit";
import { ChecklistBuildAddEdit } from "@preventive/checklist-build/ChecklistBuildAddEdit";
import { WorkSchedule } from "@preventive/work-schedules/WorkSchedule";
import { WorkScheduleAdd } from "@preventive/work-schedules/work-schedule-add/WorkScheduleAdd";
import { ChecklistPending } from "@preventive/checklist-pending/ChecklistPending";
import { ChecklistPendingAdd } from "@preventive/checklist-pending/checklist-pending-add/ChecklistPendingAdd";
import { JointInspection } from "@preventive/joint-inspection/JointInpsection";
import { JointInspectionAdd } from "@preventive/joint-inspection/joint-inspection-add/JointInspectionAdd";
import RegisterDefect from "@preventive/defects/RegisterDefect";
import AssignToTechnician from "@preventive/defects/AssignToTechnician";
import RectifyDefectList from "@preventive/defects/RectifyDefectList";
import RectifyDefectView from "@preventive/defects/RectifyDefectView";
import Defects from "@preventive/defects/Defects";

//email notification
import EmailNotification from "@emailnotification/EmailNotification";




const routes = [
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <SignIn />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "reset-password",
        element: <ResetPassword />,
      },
      {
        path: "404",
        element: <Page404 />,
      },
      {
        path: "500",
        element: <Page500 />,
      },
    ],
  },
  {
    path: "*",
    element: <AuthLayout />,
    children: [
      {
        path: "*",
        element: <Page404 />,
      },
    ],
  },
  {
    path: "/",
    element: <PrivateLayout />,
  },
  {
    path: "contract-management",
    element: <PrivateLayout />,
    children: [
      {
        path: "contracts",
        element: <Contracts />,
      },
      {
        path: "contracts/:id",
        element: <AddEditContract />,
      },
    ],
  },
  {
    path: "property-management",
    element: <PrivateLayout />,
    children: [
      {
        path: "sectors",
        element: <Sectors />,
      },
      {
        path: "sectors/:id",
        element: <AddEditSector />,
      },
      {
        path: "sites",
        element: <Sites />,
      },
      {
        path: "sites/:id",
        element: <AddEditSite />,
      },
      {
        path: "levels",
        element: <Levels />,
      },
      {
        path: "levels/:id",
        element: <AddEditLevel />,
      },
      {
        path: "areas",
        element: <Areas />,
      },
      {
        path: "areas/:id",
        element: <AddEditArea />,
      },
    ],
  },
  {
    path: "assets-management",
    element: <PrivateLayout />,
    children: [
      {
        path: "assets",
        element: <Assets />,
      },
      {
        path: "create-asset",
        element: <CreateAsset />,
      },
      {
        path: "assets/:id",
        element: <EditAsset />,
      },
    ],
  },
  {
    path: "email-notification",
    element: (
      <PrivateLayout>
        <EmailNotification />
      </PrivateLayout>
    ),
  },
  {
    path: "settings",
    element: <PrivateLayout />,
    children: [
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "users/:id",
        element: <AddEditUser />,
      },
      {
        path: "groups",
        element: <Groups />,
      },
      {
        path: "permissions",
        element: <Permissions />,
      },
      {
        path: "email-templates",
        element: <EmailTemplates />,
      },
      {
        path: "email-templates/:id",
        element: <AddEditEmailTemplate />,
      },
    ],
  },
  {
    path: "faults",
    element: <PrivateLayout />,
    children: [
      {
        path: "callcentre",
        element: <CallCentreFaultList />,
      },
      {
        path: "callcentre/:id",
        element: <CallCentreFaultView />,
      },
      {
        path: "response",
        element: <FaultResponseList />,
      },
      {
        path: "response/:id",
        element: <FaultResponseView />,
      },
      {
        path: "verification-to",
        element: <FaultVerificationTOList />,
      },
      {
        path: "verification-to/:id",
        element: <FaultVerificationTOView />,
      },
      {
        path: "verification-nea",
        element: <FaultVerificationNEAList />,
      },
      {
        path: "verification-nea/:id",
        element: <FaultVerificationNEAView />,
      },
      {
        path: "rectified",
        element: <FaultRectifiedList />,
      },
      {
        path: "rectified/:id",
        element: <FaultRectifiedView />,
      },
      {
        path: "eot-requests",
        element: <FaultEOTRequestList />,
      },
      {
        path: "eot-requests/:id",
        element: <FaultEOTRequestView />,
      },
      {
        path: "eot-approval",
        element: <FaultEOTApprovalList />,
      },
      {
        path: "eot-approval/:id",
        element: <FaultEOTApprovalView />,
      },
      {
        path: "eot/:id",
        element: <FaultEOTView />,
      },
      {
        path: "eot/:id/apply",
        element: <FaultEOTView />,
      },
      {
        path: "eot/:id/approval",
        element: <FaultEOTView />,
      },
      {
        path: "incident-reports",
        element: <FaultIncidentReportList />,
      },
      {
        path: "incident-reports/:id",
        element: <FaultIncidentReportView />,
      },
      {
        path: "incident-reports/:id/add",
        element: <FaultIncidentReportView />,
      },
      {
        path: "followup",
        element: <FaultFollowUpList />,
      },
      {
        path: "followup/:id",
        element: <FaultResponseView />,
      },
      {
        path: "summary",
        element: <FaultSummaryList />,
      },
    ],
  },
  {
    path: "preventive-maintenance",
    element: <PrivateLayout />,
    children: [
      {
        path: "checklist-type",
        element: <ChecklistType />,
      },
      {
        path: "checklist-type/:action",
        element: <ChecklistTypeAddEdit />,
      },
      {
        path: "checklist-items",
        element: <ChecklistItems />,
      },
      {
        path: "checklist-items/:action",
        element: <ChecklistItemsAddEdit />,
      },
      {
        path: "checklist-sub-items",
        element: <ChecklistSubItems />,
      },
      {
        path: "checklist-sub-items/:action",
        element: <ChecklistSubItemsAddEdit />,
      },
      {
        path: "checklist-build",
        element: <ChecklistBuild />,
      },
      {
        path: "checklist-build/:action",
        element: <ChecklistBuildAddEdit />,
      },
      {
        path: "work-schedule",
        element: <WorkSchedule />,
      },
      {
        path: "work-schedule/:action",
        element: <WorkScheduleAdd />,
      },
      {
        path: "checklist-pending",
        element: <ChecklistPending />,
      },
      {
        path: "checklist-pending/:action",
        element: <ChecklistPendingAdd />,
      },
      {
        path: "joint-inspection",
        element: <JointInspection />,
      },
      {
        path: "joint-inspection/:action",
        element: <JointInspectionAdd />,
      },
      {
        path: "defects",
        element: <Defects />,
      },
      {
        path: "defects/register",
        element: <RegisterDefect />,
      },
      {
        path: "defects/assignment",
        element: <AssignToTechnician />,
      },
      {
        path: "defects/rectify",
        element: <RectifyDefectList />,
      },
      {
        path: "defects/rectify/:id",
        element: <RectifyDefectView />,
      },
    ],
  },
];

export default routes;
