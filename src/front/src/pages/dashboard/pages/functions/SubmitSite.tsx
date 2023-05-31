import { AxiosResponse } from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, useNavigation } from "react-router-dom";
import privateApi from "../../../../api/axiosapi";
import { Site } from "../../../../types/Site.type";

function getSiteData(site: Site) : FormData
{
    let form = new FormData();

    form.append('id', site.id.toString());
    form.append('name', site.name);
    form.append('url', site.url);
    form.append('interval', site.interval);
    form.append('description', site.description);
    
    site.groups.forEach(group => {
        form.append('groupIds[]', group.id.toString());
    });

    return form;
}

async function createSite(site: Site) : Promise<void>
{

    const formData = getSiteData(site);
    formData.delete('id');

    return privateApi.post<Site>('/site/create', formData)
        .then((response) => {})
        .catch((error) => {
            console.log(error);
            throw Error(error);
        })
}

function updateSite(site: Site) : Promise<void>
{
    return Promise.resolve();
}

export function submitSite(site: Site)
{
    return site.id === 0 ? createSite(site) : updateSite(site);
}