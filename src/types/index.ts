
export enum RegistrationTypes {
    NON_IEEE_PROFESSIONALS = "non_ieee_professional",
    NON_IEEE_STUDENTS = "non_ieee_students",
    IEEE_PROFESSIONALS = "ieee_professionals",
    IEEE_STUDENTS = "ieee_students",
    COLLEGE_STUDENTS = "college_students",
}

export const RegistrationPricing = {
    [RegistrationTypes.NON_IEEE_PROFESSIONALS]: 349,
    [RegistrationTypes.NON_IEEE_STUDENTS]: 299,
    [RegistrationTypes.IEEE_PROFESSIONALS]: 299,
    [RegistrationTypes.IEEE_STUDENTS]: 249,
    [RegistrationTypes.COLLEGE_STUDENTS]: 199,
}
