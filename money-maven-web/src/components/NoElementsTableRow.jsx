function NoElementsTableRow({elementType}) {
    return ( 
        <tr>
            <td colSpan={0}>No {elementType} were found</td>
        </tr>
     );
}

export default NoElementsTableRow;