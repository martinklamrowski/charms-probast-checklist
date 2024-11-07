// interface Project {
//     id: string;
//     name: string;
//     description?: string;
// }

interface ProjectFormData {
    name: string;
    description: string;
    createdAt: Date;
    charms: boolean;
    probast: boolean;
    tripod: boolean;
    memberEmails: string[];
}