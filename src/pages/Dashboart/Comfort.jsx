import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddComfort from "../../Modal/AddComfort";
import { comfortUtils } from "../../utils/comfort.utils";
import { IMG_BASE_URL } from "../../constants/img.constants";
import EditComfort from "../../Modal/EditComfort";
import toastify from "../../utils/toastify";
import DeleteAllModal from "../../Modal/DeleteAllModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Loading from "../../Components/Loading/Loading";

function Comfort() {
  const queryClient = useQueryClient();
  const comforts = useQuery({
    queryKey: ["comforts"],
    queryFn: comfortUtils.getComfort,
  });
  const deletComfort = useMutation({
    mutationFn: comfortUtils.deleteComfort,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comforts"],
      });
      queryClient.invalidateQueries({
        queryKey: ["unusedTranslates"],
      });
      toastify.successMessage("Muvaffaqiyat o'chirildi");
    },
  });

  if (comforts.isLoading) return <Loading />;

  return (
    <div className="comforts">
      <div className="language-haed d-flex justify-content-between">
        <h2>Comfort</h2>
        <AddComfort />
      </div>
      <div className="language-inner">
        {comforts.data?.length ? (
          <table className="table table-bordered shadow">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Img</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
            </thead>
            <tbody>
              {comforts.data.map((e, i) => {
                return (
                  <tr key={e.id}>
                    <th scope="row">{i + 1}</th>
                    <td className="fw-medium fs-5">{e.name}</td>
                    <td>
                      <LazyLoadImage
                        src={`${IMG_BASE_URL}${e.image}`}
                        width={50}
                        height={60}
                        alt="img"
                        effect="blur"
                      />
                    </td>
                    <td>
                      <EditComfort id={e.id} />
                    </td>
                    <td>
                      <DeleteAllModal
                        deleteFunction={deletComfort.mutate}
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
            <h3 className="text-xl mt-4">There is no comfort</h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Comfort;
