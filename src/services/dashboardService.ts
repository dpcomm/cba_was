import DashboardRepository from "@repositories/dashBoardRepository";



const dashBoardRepository = new DashboardRepository();


class DashboardService {
    async getDashboard(group: string) {
        try {
            const groupCount = await dashBoardRepository.findAllGroupMembers();
            const registryMembers = await dashBoardRepository.findAllRegistryMembers();
            const PaidMembers = await dashBoardRepository.findAllPaidMembers();
            const AtendMembers = await dashBoardRepository.findAllAtendMembers();
            
            if (!groupCount) {
                return ({
                    ok: 0,
                    message: "GroupMembers not exist"
                });
            }
            if (!registryMembers) {
                return ({
                    ok: 0,
                    message: "RegistryMembers not exist"
                });
            }
            if (!PaidMembers) {
                return ({
                    ok: 0,
                    message: "PaidMembers not exist"
                });
            }
            if (!AtendMembers) {
                return ({
                    ok: 0,
                    message: "AtendMembers not exist"
                });
            }
            return ({
                ok: 1,
                message: "get GroupMembers success",
                groupCount,registryMembers,PaidMembers,AtendMembers
            });
        } catch(err) {
            throw err;
        }
    }
    
}


export default DashboardService;