const PostTable = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <table>
        <tr>
          <th>Post no.</th>
          <th>Created at</th>
          <th>Subcategory</th>
          <th>Show</th>
          <th>Detail</th>
        </tr>
        <tbody>{props.children}</tbody>
      </table>
    </div>
  );
};

export default PostTable;
