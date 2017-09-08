<template>
  <div class="addroom">
    <div class="row card-wrap">
      <div class="cardo col-sm-12 col-md-3">
        <div class="box" type="button" data-toggle="modal" data-target="#myModal">
          <div class="add-wrapper">
            <img src="../assets/plus.png" />
          </div>
          <div class="card-block">
            <h4 class="card-title">Room Name</h4>
          </div>
        </div>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="myModal" role="dialog">
        <div class="modal-dialog">
          <!-- Modal content-->
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">&times;</button>
              <h4 class="modal-title">Room</h4>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="Room">Room:</label>
                  <input type="Room" class="form-control" id="Room" placeholder="Room name">
                </div>
                <div class="form-group">
                  <label for="player">Inform This Room:</label>
                  <input type="player" class="form-control" id="player" placeholder="How many player">
                </div>
                <button class="btn sub btn-warning start">START</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="cardo col-sm-12 col-md-3">
        <div class="box">
          <div class="img-wrapper">
            <img src="../assets/wolfie.png" />
          </div>
          <div class="card-block">
            <h4 class="card-title">Room Name</h4>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'addroom'
}
</script>
