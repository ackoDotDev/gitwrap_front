

function Commit(commit) {
    if (!commit) return null;
  
    return <tr key={commit.sha}>
      <td>
        <a href={commit.author?.html_url}>
          {commit.author?.login}
        </a>
      </td>
      <td>
        {commit.commit?.committer?.name}
      </td>
      <td>
        {commit.commit.message}
      </td>
    </tr>
}


export default Commit;