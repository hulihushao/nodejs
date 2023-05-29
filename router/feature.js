let { write } = require("../src/fileWrite");
// category路由文件
const express = require("express");
const router = express.Router();

router.get("/features/:userId", (req, res) => {
  let { userId } = req.params;
  let featureData = require("../data/features.json");
  let features = featureData.features.filter(
    (item) => item.properties.uid == userId
  );
  featureData.features = features;
  featureData.totalFeatures = features.length;
  console.log(featureData);
  res.send({
    code: 200,
    data: featureData,
  });
});
router.post("/insertPoint", (req, res) => {
  console.log(req.body);
  let featureData = require("../data/features.json");
  let { uid, xy, map_point_name, create_time, comment, lxtime } = req.body;
  let id = featureData.features.length + 1;
  let data = {
    geometry: {
      coordinates: xy.split(","),
      type: "Point",
    },
    id: "MAPPOINT." + id,
    geometry_name: "Pnt",
    type: "Feature",
    properties: {
      lxtime,
      mapPointName: map_point_name,
      comment,
      modifyTime: create_time,
      createTime: create_time,
      id: id,
      uid: uid,
      mpLayer: "0",
    },
  };
  write(
    "features.json",
    (arr) => {
      arr.features.push(data);
      arr.totalFeatures = arr.features.length;
      return { arr, obj: data };
    },
    (newData) => {
      res.send({
        code: 200,
        data: newData,
      });
    }
  );
});
router.post("/updatePoint", (req, res) => {
  let { fid, uid, map_point_name, modify_time, comment, lxtime } = req.body;
  write(
    "features.json",
    (arr) => {
      let index = arr.features.findIndex(
        (item) => item.properties.id == fid && item.properties.uid == uid
      );
      if (index >= 0) {
        arr.features[index].properties.comment = comment;
        arr.features[index].properties.lxtime = lxtime;
        arr.features[index].properties.modifyTime = modify_time;
        arr.features[index].properties.mapPointName = map_point_name;
      }
      return { arr, obj: arr.features[index] };
    },
    (newData) => {
      if (newData) {
        res.send({
          code: 200,
          data: newData,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "点位不存在",
        });
      }
    }
  );
});
router.post("/delFeature",(req,res)=>{
  let {fid,uid}=req.body
  write(
    "features.json",
    (arr) => {
      let delFeature
      if(Array.isArray(fid)){
        delFeature=[]
        fid.forEach(item=>{
          arr.features=arr.features.filter(itm=>{
            if(itm.properties.uid==uid){
              if(itm.properties.id!=item){
                return itm
              }else{
                delFeature.push(itm)
              }
            }else{
              return itm
            }
          })
        })
        arr.totalFeatures=arr.totalFeatures-fid.length
        return {arr,obj:delFeature}
      }
      let index = arr.features.findIndex(
        (item) => item.properties.id == fid && item.properties.uid == uid
      );
      if (index >= 0) {
        delFeature=arr.features.splice(index,1)
      }
      arr.totalFeatures=arr.totalFeatures-1
      return { arr, obj: delFeature };
    },
    (newData) => {
      if (newData) {
        res.send({
          code: 200,
          data: newData,
        });
      } else {
        res.status(404).send({
          code: 404,
          message: "点位不存在",
        });
      }
    }
  )
})
// 导出
module.exports = router;
