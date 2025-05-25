import { Injectable } from '@angular/core';
import { HolidayPlan } from '../model/holiday-plan';

@Injectable({
    providedIn: 'root',
})
export class HolidayPlanService {

    holidayPlans: HolidayPlan[] = [
        {
            "id": "6c8311c4-d902-4a68-b241-cbb6f56701f8",
            "collaboratorId": "2541a8b8-ed5e-4530-88ea-893796e60507",
            "holidayPeriods": [
                {
                    "id": "4185ea30-6dc8-44c4-b1eb-99f139838fe5",
                    "period": {
                        "initDate": "2023-12-04",
                        "finalDate": "2023-12-17"
                    }
                },
                {
                    "id": "c707f104-17e1-46ed-b1bb-c5b9b864b813",
                    "period": {
                        "initDate": "2023-12-13",
                        "finalDate": "2023-12-23"
                    }
                },
                {
                    "id": "256d3706-deaf-4031-8ced-cf640cde776c",
                    "period": {
                        "initDate": "2023-03-21",
                        "finalDate": "2023-04-03"
                    }
                },
                {
                    "id": "05fea289-a0cc-47e1-8100-108020e89c17",
                    "period": {
                        "initDate": "2023-09-09",
                        "finalDate": "2023-09-19"
                    }
                }
            ]
        },
        {
            "id": "4f903959-80b7-4b40-8ebf-5149bb467edd",
            "collaboratorId": "31ada466-96f5-4886-9af0-557aa7fcdbb5",
            "holidayPeriods": [
                {
                    "id": "82a11f1e-6578-42ac-b37e-542ba130e0e7",
                    "period": {
                        "initDate": "2023-03-19",
                        "finalDate": "2023-03-28"
                    }
                }
            ]
        },
        {
            "id": "7e422717-1424-453b-949f-0014038ac15c",
            "collaboratorId": "4a92d674-bf09-4176-a846-2cbf0beb3774",
            "holidayPeriods": [
                {
                    "id": "91c4de5f-07a2-40e4-8da3-4b7968be79af",
                    "period": {
                        "initDate": "2025-01-28",
                        "finalDate": "2025-02-07"
                    }
                },
                {
                    "id": "6d8c6171-93b8-49aa-9f57-dae54df1980d",
                    "period": {
                        "initDate": "2025-09-11",
                        "finalDate": "2025-09-24"
                    }
                },
                {
                    "id": "22611dd8-5c45-4877-9e57-727bffa4167e",
                    "period": {
                        "initDate": "2025-01-06",
                        "finalDate": "2025-01-19"
                    }
                },
                {
                    "id": "eb09974c-522c-439f-88ca-c37b05f421ef",
                    "period": {
                        "initDate": "2025-06-29",
                        "finalDate": "2025-07-09"
                    }
                },
                {
                    "id": "a6ddbeeb-bb87-4850-bbb0-d2fedc78928d",
                    "period": {
                        "initDate": "2025-03-28",
                        "finalDate": "2025-04-10"
                    }
                }
            ]
        },
        {
            "id": "9913df19-1c96-4b9f-80b3-4031e17db32c",
            "collaboratorId": "466ae640-b818-4540-a4d8-16cd4145daf7",
            "holidayPeriods": [
                {
                    "id": "b0de7fc9-098b-4724-a7ca-8cd27ad3287b",
                    "period": {
                        "initDate": "2024-01-08",
                        "finalDate": "2024-01-19"
                    }
                },
                {
                    "id": "00476f8d-60e1-40b9-820f-ef66ac27c941",
                    "period": {
                        "initDate": "2024-06-30",
                        "finalDate": "2024-07-13"
                    }
                },
                {
                    "id": "3a410d2a-f397-446e-a990-c494d0d90d55",
                    "period": {
                        "initDate": "2024-06-06",
                        "finalDate": "2024-06-14"
                    }
                },
                {
                    "id": "860a0fa3-2778-47e1-b16a-c26a7934e99d",
                    "period": {
                        "initDate": "2024-09-07",
                        "finalDate": "2024-09-13"
                    }
                },
                {
                    "id": "ef77583c-bb3c-46f3-ac31-ed54f6c4168d",
                    "period": {
                        "initDate": "2024-08-19",
                        "finalDate": "2024-08-28"
                    }
                }
            ]
        },
        {
            "id": "4fee3897-f4fb-4fa1-9f29-2957341e7519",
            "collaboratorId": "5cddda17-1f64-4a18-87e0-28c192eac13a",
            "holidayPeriods": [
                {
                    "id": "f5075573-9278-4cb9-bce7-af1c1aab81f4",
                    "period": {
                        "initDate": "2025-12-08",
                        "finalDate": "2025-12-21"
                    }
                },
                {
                    "id": "4681b564-e63c-49af-a6a5-70817c6d25a1",
                    "period": {
                        "initDate": "2025-01-04",
                        "finalDate": "2025-01-14"
                    }
                }
            ]
        },
        {
            "id": "6a266201-2cd7-45a5-b299-3989353f6f10",
            "collaboratorId": "235ba33b-b290-4279-bb23-f4cabcdc12d0",
            "holidayPeriods": [
                {
                    "id": "99688700-c8b2-464a-8d19-1108b7905efb",
                    "period": {
                        "initDate": "2024-07-18",
                        "finalDate": "2024-07-26"
                    }
                },
                {
                    "id": "2e3d9ee0-e961-4457-809a-4d82c0edd31c",
                    "period": {
                        "initDate": "2024-11-16",
                        "finalDate": "2024-11-24"
                    }
                }
            ]
        },
        {
            "id": "e2bd2bbe-64d1-4b32-9267-760e52aafb03",
            "collaboratorId": "b527683e-637c-4271-afcd-ef716f5c5500",
            "holidayPeriods": [
                {
                    "id": "5631726e-b037-4288-a2d4-9c42aadb498e",
                    "period": {
                        "initDate": "2025-12-04",
                        "finalDate": "2025-12-09"
                    }
                },
                {
                    "id": "6267afb4-3d29-4eae-8348-e26a9f86a48a",
                    "period": {
                        "initDate": "2025-03-15",
                        "finalDate": "2025-03-28"
                    }
                },
                {
                    "id": "a645e343-3a42-48b6-a7c4-1cdb9d1b9e97",
                    "period": {
                        "initDate": "2025-05-16",
                        "finalDate": "2025-05-30"
                    }
                },
                {
                    "id": "e1b6ea0f-b600-43a6-b916-94e63b372571",
                    "period": {
                        "initDate": "2025-05-22",
                        "finalDate": "2025-05-31"
                    }
                },
                {
                    "id": "99e4247e-6e63-4fcd-8762-4fe95333d264",
                    "period": {
                        "initDate": "2025-09-14",
                        "finalDate": "2025-09-23"
                    }
                }
            ]
        },
        {
            "id": "a024796f-d944-41cf-8edb-6285c53eefc5",
            "collaboratorId": "3768bb27-2d5f-4ec8-a674-4485e9a9ad64",
            "holidayPeriods": [
                {
                    "id": "aaa8b158-d396-4962-837d-6c7186b7afe9",
                    "period": {
                        "initDate": "2025-02-11",
                        "finalDate": "2025-02-16"
                    }
                },
                {
                    "id": "efc7e45d-8d2a-4089-9775-2b23a95cea0c",
                    "period": {
                        "initDate": "2025-12-04",
                        "finalDate": "2025-12-10"
                    }
                },
                {
                    "id": "f4e4284b-21b6-4334-a2c5-b188be99c723",
                    "period": {
                        "initDate": "2025-10-22",
                        "finalDate": "2025-11-03"
                    }
                },
                {
                    "id": "73c5bb74-7d66-4657-9942-c19b3c3e6e7d",
                    "period": {
                        "initDate": "2025-05-21",
                        "finalDate": "2025-06-02"
                    }
                },
                {
                    "id": "9ba0a32a-d46e-411b-8b32-dd760d0d4d46",
                    "period": {
                        "initDate": "2025-04-12",
                        "finalDate": "2025-04-18"
                    }
                }
            ]
        }
    ];

    getHolidayPlans(): HolidayPlan[] {
        return this.holidayPlans;
    }

    getHolidayPlanById(id: string): HolidayPlan {
        const holidayPlan = this.holidayPlans.find(holidayPlan => holidayPlan.id === id);
        if (!holidayPlan) {
            throw new Error(`holidayPlan with id ${id} not found`);
        }
        return holidayPlan;
    }

    getHolidayPlanByCollaboratorId(id: string): HolidayPlan {
        const holidayPlan = this.holidayPlans.find(holidayPlan => holidayPlan.collaboratorId === id);
        if (!holidayPlan) {
            throw new Error(`Collaborator with id ${id} doesn't have holiday plan`);
        }
        return holidayPlan;
    }

}
