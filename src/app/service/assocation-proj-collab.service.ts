import { Injectable } from '@angular/core';
import { AssociationProjCollab } from '../model/association-proj-collab';

@Injectable({
    providedIn: 'root',
})
export class AssociationProjCollabService {

    associations: AssociationProjCollab[] = [
        {
            id: "43c8f184-55b3-4ee3-9a9d-8bf324f266c1",
            collaboratorId: "31ada466-96f5-4886-9af0-557aa7fcdbb5",
            projectId: "eccf5555-10bd-4ff3-b88d-de101db92cb0",
            period: {
                initDate: "2025-01-01",
                finalDate: "2025-04-19"
            }
        },
        {
            id: "0c10f19e-c5b7-4e79-b4fd-7877dfeb3721",
            collaboratorId: "31ada466-96f5-4886-9af0-557aa7fcdbb5",
            projectId: "51593fc9-91b3-4ad5-a4c7-213df7b3fe48",
            period: {
                initDate: "2025-01-01",
                finalDate: "2025-05-13"
            }
        },
        {
            id: "169855ee-bb41-495d-b109-d644ad6bc674",
            collaboratorId: "466ae640-b818-4540-a4d8-16cd4145daf7",
            projectId: "51593fc9-91b3-4ad5-a4c7-213df7b3fe48",
            period: {
                initDate: "2025-01-01",
                finalDate: "2025-06-14"
            }
        },
        {
            id: "e1c1f0ac-065d-4d72-9c2d-55ec4d3c533d",
            collaboratorId: "466ae640-b818-4540-a4d8-16cd4145daf7",
            projectId: "a8b349d0-86c1-4158-ad6a-7d30b18b2f53",
            period: {
                initDate: "2025-07-01",
                finalDate: "2025-11-11"
            }
        },
        {
            id: "3cdee567-de9b-4a0d-9ccd-3482c5235364",
            collaboratorId: "235ba33b-b290-4279-bb23-f4cabcdc12d0",
            projectId: "eccf5555-10bd-4ff3-b88d-de101db92cb0",
            period: {
                initDate: "2025-01-01",
                finalDate: "2025-06-30"
            }
        },
        {
            id: "30c9d917-50a4-4f4c-9e85-ccc789023cc6",
            collaboratorId: "3768bb27-2d5f-4ec8-a674-4485e9a9ad64",
            projectId: "4dfdae9c-8ca4-4b72-a847-603a8f94c965",
            period: {
                initDate: "2025-07-01",
                finalDate: "2026-01-25"
            }
        },
        {
            id: "748d69da-4e65-4ccb-945f-726c2ffc8faa",
            collaboratorId: "3768bb27-2d5f-4ec8-a674-4485e9a9ad64",
            projectId: "51593fc9-91b3-4ad5-a4c7-213df7b3fe48",
            period: {
                initDate: "2025-01-01",
                finalDate: "2025-06-30"
            }
        }
    ];

    getAssociations(): AssociationProjCollab[] {
        return this.associations;
    }

    getAssociationById(id: string): AssociationProjCollab {
        const association = this.associations.find(assoc => assoc.id === id);
        if (!association) {
            throw new Error(`Association with id ${id} not found`);
        }
        return association;
    }

}
