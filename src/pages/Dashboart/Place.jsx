import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddPlace from "../../Modal/AddPlace";

import { placeUtils } from "../../utils/place.utils";
import { IMG_BASE_URL } from "../../constants/img.constants";
import EditPlace from "../../Modal/EditPlace";
import toastify from "../../utils/toastify";
import DeleteAllModal from "../../Modal/DeleteAllModal";

// lazy load
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import Loading from "../../Components/Loading/Loading";

function Place() {
  const queryClient = useQueryClient();
  const place = useQuery({
    queryKey: ["places"],
    queryFn: placeUtils.getPlace,
  });
  const delePlace = useMutation({
    mutationFn: placeUtils.deletePlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["places"] });
      toastify.infoMessage("Joy nomi o'chirildi");
    },
  });

  if (place.isLoading) return <Loading />;

  return (
    <div>
      <div className="place">
        <div className="place-haed d-flex justify-content-between">
          <h2>Place</h2>
          <AddPlace />
        </div>
        <div className="language-inner">
          {place.data?.length ? (
            <table className="table shadow-lg  table-rounded mt-4">
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
                {place.data.map((e, i) => {
                  return (
                    <tr key={e.id}>
                      <th scope="row">{i + 1}</th>
                      <td>{e.name}</td>
                      <td>
                        <LazyLoadImage
                          width={95}
                          height={65}
                          src={`${IMG_BASE_URL}${e.image}`}
                          alt="img"
                          effect="blur"
                        />
                      </td>
                      <td>
                        <EditPlace id={e.id} />
                      </td>
                      <td>
                        <DeleteAllModal
                          deleteFunction={delePlace.mutate}
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
              <h3 className="mt-4 text-xl">There is no place</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Place;
