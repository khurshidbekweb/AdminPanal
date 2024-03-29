import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cottageTypeUtils } from "../../utils/cottage-type.utils";
import AddCottageType from "../../Modal/AddCottageType";
import EditCottageType from "../../Modal/EditCottageType";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import toastify from "../../utils/toastify";
import Loading from "../../Components/Loading/Loading";

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

  if (cottageType.isLoading) return <Loading />;

  return (
    <div>
      <div className="place">
        <div className="place-haed d-flex justify-content-between">
          <h2>Cottage Type</h2>
          <AddCottageType />
        </div>
        <div className="language-inner">
          {cottageType.data?.length ? (
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
                {cottageType.data.map((e, i) => {
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
          ) : (
            <div>
              <h3 className="mt-4 text-xl">There is no cottage type</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CottageType;
