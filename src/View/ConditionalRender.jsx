function ConditionalRender(props) {
    if (props.permissions.includes(props.permissionsToCheck)) return props.component;
    return null;
}
  
export default ConditionalRender;