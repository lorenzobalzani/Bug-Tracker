function ConditionalRender(permissions, permissionsToCheck) {
    if (permissions.includes(permissionsToCheck)) return true;
    return false;
}
  
export default ConditionalRender;