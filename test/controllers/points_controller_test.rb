require 'test_helper'

class PointsControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get points_index_url
    assert_response :success
  end

  test "should get show" do
    get points_show_url
    assert_response :success
  end

end
