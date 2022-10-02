const xlsx = require('xlsx');
const path = require('path');
const xlformat = (file) => {
  const path = `./client/build/uploads/${file.name}`;
  const WB = xlsx.readFile(path);
  const shipmentWS = WB.Sheets['Shipment'];
  const shipmentJSON = xlsx.utils.sheet_to_json(shipmentWS);

  // Entire table but formatted
  const data = shipmentJSON.map((row) => {
    const {
      // Destructure relevant row info
      Search,
      'Orig Ctry': OrigCtry,
      'Orig Stn': OrigStn,
      'Dest Ctry': DestCtry,
      'Dest Stn': DestStn,
      Prod,
      'Shipper Name': ShipperName,
      'Last Event Stn': LastEventStn,
      'Last Event Cd': LastEventCd,
      'Last Event Remark': LastEventRemark,
    } = row;
    // Return to data object
    return {
      Search,
      OrigCtry,
      OrigStn,
      DestCtry,
      DestStn,
      Prod,
      ShipperName,
      LastEventStn,
      LastEventCd,
      LastEventRemark,
    };
  });

  // AWB numbers to copy
  const dataAWB = data.map((curr) => {
    return curr.Search;
  });

  // All shipments with a checkpoint outside of Sweden (except RT and CS)
  const cdShipments = data.filter((row) => {
    const eval = () => {
      let cd;
      let stn;
      let prod = true;
      // Confirms CD that's not RT or CS
      switch (row.LastEventCd) {
        case '':
          cd = false;
          break;
        case 'RT':
          cd = false;
          break;
        case 'CS':
          cd = false;
          break;
        default:
          cd = true;
      }
      // Checks that shipment has a checkpoint outside of SE
      switch (row.LastEventStn) {
        case 'STO':
          stn = false;
          break;
        case 'VST':
          stn = false;
          break;
        case 'GOT':
          stn = false;
          break;
        case 'ARN':
          stn = false;
          break;
        case 'MMA':
          stn = false;
          break;
        default:
          stn = true;
      }
      // Checks that shipment is nondoc
      if (
        row.Prod == '1' ||
        row.Prod == '2' ||
        row.Prod == '5' ||
        row.Prod == '7' ||
        row.Prod == '9' ||
        row.Prod == 'B' ||
        row.Prod == 'C' ||
        row.Prod == 'D' ||
        row.Prod == 'G' ||
        row.Prod == 'I' ||
        row.Prod == 'J' ||
        row.Prod == 'K' ||
        row.Prod == 'L' ||
        row.Prod == 'N' ||
        row.Prod == 'O' ||
        row.Prod == 'R' ||
        row.Prod == 'S' ||
        row.Prod == 'T' ||
        row.Prod == 'U' ||
        row.Prod == 'W' ||
        row.Prod == 'X' ||
        row.Prod == '' ||
        row.OrigCtry != 'SE'
      ) {
        prod = false;
      }

      if (cd && stn && prod) {
        return true;
      } else {
        return false;
      }
    };
    if (eval()) {
      return true;
    }
  });
  // AWB numbers to copy
  const cdShipmentsAWB = cdShipments.map((curr) => {
    return curr.Search;
  });

  // Shipments that can be removed from EMMA (RT, CS, missort, imports, non dutiable etc.)
  const shipmentsToRemove = data.filter((row) => {
    if (
      row.LastEventCd == 'RT' ||
      row.LastEventCd == 'CS' ||
      !row.OrigCtry == 'SE' ||
      row.DestCtry == 'SE' ||
      row.Prod == '1' ||
      row.Prod == '2' ||
      row.Prod == '5' ||
      row.Prod == '7' ||
      row.Prod == '9' ||
      row.Prod == 'B' ||
      row.Prod == 'C' ||
      row.Prod == 'D' ||
      row.Prod == 'G' ||
      row.Prod == 'I' ||
      row.Prod == 'J' ||
      row.Prod == 'K' ||
      row.Prod == 'L' ||
      row.Prod == 'N' ||
      row.Prod == 'O' ||
      row.Prod == 'R' ||
      row.Prod == 'S' ||
      row.Prod == 'T' ||
      row.Prod == 'U' ||
      row.Prod == 'W' ||
      row.Prod == 'X' ||
      row.OrigCtry != 'SE'
    ) {
      return true;
    }
  });
  // AWB numbers to copy
  const shipmentsToRemoveAWB = shipmentsToRemove.map((curr) => {
    return curr.Search;
  });

  const summary = {
    data,
    dataAWB,
    shipmentsToRemove,
    shipmentsToRemoveAWB,
    cdShipments,
    cdShipmentsAWB,
  };
  return summary;
};

module.exports = xlformat;
