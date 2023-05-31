import privateApi from "../../../../api/axiosapi";
import UseInitialGroupState from "../../../../hooks/UseInitialGroupState";
import { Group } from "../../../../types/Group.type";

function getFormData(group: Group)
{
    const form = new FormData();

    form.append('id', group.id.toString());
    form.append('name', group.name);

    return form;
}

function updateGroup(group: Group) : Promise<Group>
{
    return Promise.resolve(UseInitialGroupState());
}

function createGroup(group: Group) : Promise<Group>
{
    const formData = getFormData(group);
    formData.delete('id');

    return privateApi.post<Group>('/group/create', formData)
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.log(error);
            throw Error(error);
        });
}

export function SubmitGroup(group: Group)
{
    return group.id === 0 ? createGroup(group) : updateGroup(group);
}