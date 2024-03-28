import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cottageTypeUtils } from "../../utils/cottage-type.utils";
import Delet from "../../assets/trash.png";
import AddCottageType from "../../Modal/AddCottageType";
import EditCottageType from "../../Modal/EditCottageType";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import toastify from "../../utils/toastify";

function CottageType() {
  const queryClient = useQueryClient();
  const cottageType = useQuery({
    queryKey: ["cottagetypes"],
    queryFn: cottageTypeUtils.getCottageType,
  });
  const deletCottageType = useMutation({
    mutationFn: cottageTypeUtils.deleteCottageType,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cottagetypes"] });
      toastify.successMessage("Cottage type deleted😅");
    },
  });

  return (
    <div>
      <div className="place">
        <div className="place-haed d-flex justify-content-between">
          <h2>Cottage Type</h2>
          <AddCottageType />
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
              {cottageType.data?.length &&
                cottageType.data.map((e, i) => {
                  return (
                    <tr key={e.id}>
                      <th scope="row">{i + 1}</th>
                      <td>{e.name}</td>
                      <td>
                        <EditCottageType id={e.id} />
                      </td>
                      <td>
                        <DeleteAllModal
                          deleteFunction={deletCottageType.mutate}
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

export default CottageType;
