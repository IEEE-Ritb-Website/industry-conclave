
export enum RegistrationTypes {
    NON_IEEE_PROFESSIONALS = "non_ieee_professional",
    NON_IEEE_STUDENTS = "non_ieee_students",
    IEEE_PROFESSIONALS = "ieee_professionals",
    IEEE_STUDENTS = "ieee_students",
    COLLEGE_STUDENTS = "college_students",
    COLLEGE_EXECOM = "college_execom",
}

export const RegistrationTypeNames = {
    [RegistrationTypes.NON_IEEE_PROFESSIONALS]: "Non-IEEE Professional",
    [RegistrationTypes.NON_IEEE_STUDENTS]: "Non-IEEE Student",
    [RegistrationTypes.IEEE_PROFESSIONALS]: "IEEE Professional",
    [RegistrationTypes.IEEE_STUDENTS]: "IEEE Student",
    [RegistrationTypes.COLLEGE_STUDENTS]: "MSRIT Student",
    [RegistrationTypes.COLLEGE_EXECOM]: "MSRIT Execom",
}

export const DiscountedRegistraionPricing = {
    [RegistrationTypes.NON_IEEE_PROFESSIONALS]: 349,
    [RegistrationTypes.NON_IEEE_STUDENTS]: 249,
    [RegistrationTypes.IEEE_PROFESSIONALS]: 299,
    [RegistrationTypes.IEEE_STUDENTS]: 199,
    [RegistrationTypes.COLLEGE_STUDENTS]: 149,
    [RegistrationTypes.COLLEGE_EXECOM]: 0,
}

export const RegistrationPricing = {
    [RegistrationTypes.NON_IEEE_PROFESSIONALS]: 349,
    [RegistrationTypes.NON_IEEE_STUDENTS]: 299,
    [RegistrationTypes.IEEE_PROFESSIONALS]: 299,
    [RegistrationTypes.IEEE_STUDENTS]: 249,
    [RegistrationTypes.COLLEGE_STUDENTS]: 199,
    [RegistrationTypes.COLLEGE_EXECOM]: 0,
}

export const PaymentProductId = {
    [RegistrationTypes.NON_IEEE_PROFESSIONALS]:
        process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "pdt_H7Qtz9uw4dD8vyHtk4OCQ" : "pdt_ee97CA99USwteUXw0y58j",
    [RegistrationTypes.NON_IEEE_STUDENTS]:
        process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "pdt_Uh5v0L9MPMqdrbFO5cA9j" : "pdt_73s1HmpnFc9JUEn12CKLy",
    [RegistrationTypes.IEEE_PROFESSIONALS]:
        process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "pdt_8PteOk74GECyNCNooqm3W" : "pdt_73s1HmpnFc9JUEn12CKLy",
    [RegistrationTypes.IEEE_STUDENTS]:
        process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "pdt_7zmzRsf1oeJzQ2FfGA7IS" : "pdt_DGZsgO6EZJjJ59079UdYr",
    [RegistrationTypes.COLLEGE_STUDENTS]:
        process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "pdt_d2b49qtewsO1c7bwAdfsr" : "pdt_iuiMmjHoFudoXxHodBXnc",
    [RegistrationTypes.COLLEGE_EXECOM]:
        process.env.DODO_PAYMENTS_ENVIRONMENT === "live_mode" ? "pdt_d2b49qtewsO1c7bwAdfsr" : "pdt_iuiMmjHoFudoXxHodBXnc",
}

export interface CouponCode {
    couponCode: string
    referralType: string[] // Organization names (e.g., ["iisc", "msrit"]) - empty means applicable to everyone
    maxLimit?: number // Maximum uses per coupon code (optional)
    discount: number // decimal value of discount (e.g., 0.1 for 10%)
    validFor?: string[] // Array of emails this coupon is valid for (optional)
}

export interface CouponCodeUsage {
    _id?: any // MongoDB ObjectId
    couponCode: string
    registrationId: string
    usedAt: Date
}
