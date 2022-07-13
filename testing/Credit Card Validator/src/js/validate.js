function luhnAlgorithm(cardNumber) {
  const toString = String(cardNumber).replace(/\D/g, '');
  let arrNum = 0;

  for (let i = 0; i < toString.length; i += 1) {
    let num = parseInt(toString[i], 10);
    if ((toString.length - i) % 2 === 0) {
      if (num * 2 > 9) {
        arrNum += (num * 2) - 9;
      } else {
        num *= 2;
        arrNum += num;
      }
    } else {
      arrNum += num;
    }
  }

  return arrNum % 10 === 0;
}

function validateNumber(cardNumber) {
  function range(start, stop, step = 1) {
    return Array(Math.ceil((stop - start) / step))
      .fill(start)
      .map((x, y) => x + y * step);
  }

  const visa = [4, 4026, 4508, 4844, 4913, 4917, 417500];
  const amerExpress = [34, 37];
  const master = [51, 52, 53, 54, 55, ...range(22210, 27210)];
  const jcb = [...range(3528, 3589)];
  const maestro = [5018, 5020, 5038, 5893, 6304, 6759, 6761, 6762, 6763];
  const discover = [65, 644, 645, 646, 647, 648, 649, 6011, ...range(622126, 622925)];
  const mir = [2200, 2201, 2202, 2203, 2204];

  for (let i = 0; i < visa.length; i += 1) {
    const sArr = String(visa[i]);
    const sNum = String(cardNumber).slice(0, sArr.length);

    if (sArr === sNum) {
      return 'visa';
    }
  }

  for (let i = 0; i < amerExpress.length; i += 1) {
    const sArr = String(amerExpress[i]);
    const sNum = String(cardNumber).slice(0, sArr.length);

    if (sArr === sNum) {
      return 'american-express';
    }
  }

  for (let i = 0; i < master.length; i += 1) {
    const sArr = String(master[i]);
    const sNum = String(cardNumber).slice(0, sArr.length);

    if (sArr === sNum) {
      return 'master-card';
    }
  }

  for (let i = 0; i < jcb.length; i += 1) {
    const sArr = String(jcb[i]);
    const sNum = String(cardNumber).slice(0, sArr.length);

    if (sArr === sNum) {
      return 'jcb';
    }
  }

  for (let i = 0; i < maestro.length; i += 1) {
    const sArr = String(maestro[i]);
    const sNum = String(cardNumber).slice(0, sArr.length);

    if (sArr === sNum) {
      return 'maestro';
    }
  }

  for (let i = 0; i < discover.length; i += 1) {
    const sArr = String(discover[i]);
    const sNum = String(cardNumber).slice(0, sArr.length);

    if (sArr === sNum) {
      return 'discover';
    }
  }

  for (let i = 0; i < mir.length; i += 1) {
    const sArr = String(mir[i]);
    const sNum = String(cardNumber).slice(0, sArr.length);

    if (sArr === sNum) {
      return 'mir';
    }
  }

  return false;
}

export { luhnAlgorithm, validateNumber };
