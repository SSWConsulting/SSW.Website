export function formatTestimonialFilename(filename: string) {
    return filename?.split("/")[2]?.split(".")[0] ?? "None selected"
}