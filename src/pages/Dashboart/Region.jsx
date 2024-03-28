import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddRegion from "../../Modal/AddRegion";
import { regionUtils } from "../../utils/region.utils";
import Delet from "../../assets/trash.png";
import EditRegion from "../../Modal/EditRegion";
import toastify from "../../utils/toastify";
import DeleteAllModal from "../../Modal/DeleteAllModal";

function Region() {
  const queryClient = useQueryClient();
  const region = useQuery({
    queryKey: ["regions"],
    queryFn: regionUtils.getRegion,
  });
  const deleteRegion = useMutation({
    mutationFn: regionUtils.deleteRegion,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["regions"] });
      toastify.successMessage("Viloyat muvaffaqiyatli o'chirildi.");
    },
    onError: () => {
      toastify.errorMessage("Hatolik yuz berdi");
    },
  });
  return (
    <div>
      <div className="place">
        <div className="place-haed d-flex justify-content-between">
          <h2>Region</h2>
          <AddRegion />
        </div>
        <div className="language-inner">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {region?.data?.length &&
                region.data.map((e, i) => {
                  return (
                    <tr key={e.id}>
                      <th scope="row">{i + 1}</th>
                      <td>{e.name}</td>
                      <td>
                        <EditRegion id={e.id} />
                      </td>
                      <td>
                        <DeleteAllModal
                          deleteFunction={deleteRegion.mutate}
                          id={e.id}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Region;
