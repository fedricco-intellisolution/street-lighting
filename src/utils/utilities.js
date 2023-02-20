export const status = (status) => {
    const lookup = {
        PENDING: "warning",
        DRAFT: "secondary",
        "ON-GOING": "info",
        COMPLETED: "success",
        EOT: "secondary",
        VOID: "danger",
        NEW: "danger",
        "IN PROGRESS": "primary",
        RESOLVED: "success",
        INSTALLED: "success",
        DEFECT: "danger",
        "PENDING FOR FIX": "warning",
    };

    return lookup[status];
};
