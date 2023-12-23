import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AddLanguage from "../../Modal/AddLanguage";
import { languageUtils } from "../../utils/language.utils";
import EditLanguage from "../../Modal/EditLanguage";
import toastify from "../../utils/toastify";

function Language() {
  const queryClient = useQueryClient();

  const languages = useQuery({
    queryKey: ["languages"],
    queryFn: languageUtils.getLanguage,
  });

  const deleteLanguage = useMutation({
    mutationFn: languageUtils.deletLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      toastify.successMessage("Til muvaffaqiyatli o'chirildi")
    },
    onError: (err) => {
      console.log(err.message);
    },
  });

  return (
    <div className="language">
      <div className="language-haed d-flex justify-content-between">
        <h2>Language</h2>
        <AddLanguage />
      </div>
      <div className="language-inner">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Code</th>
              <th scope="col">Language</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {languages?.data?.length &&
              languages.data.map((e, i) => {
                return (
                  <tr key={e.id}>
                    <th scope="row">{i + 1}</th>
                    <td>{e.code}</td>
                    <td>{e.title}</td>
                    <td><EditLanguage id={e.id}/></td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => deleteLanguage.mutate(e.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Language;
